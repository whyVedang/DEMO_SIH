import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  X, 
  FlashlightIcon as Flashlight, 
  RotateCcw, 
  Type, 
  CheckCircle, 
  AlertCircle,
  QrCode,
  Upload
} from 'lucide-react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import toast from 'react-hot-toast';

const QRScanner = ({ 
  isOpen, 
  onClose, 
  onScan, 
  onError,
  showManualEntry = true,
  className = ''
}) => {
  const [scannerMode, setScannerMode] = useState('camera'); // 'camera', 'manual', 'upload'
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [scannerInstance, setScannerInstance] = useState(null);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  
  const scannerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize camera permissions and devices
  useEffect(() => {
    if (isOpen && scannerMode === 'camera') {
      initializeCamera();
    }
    
    return () => {
      if (scannerInstance) {
        scannerInstance.stop().catch(console.error);
      }
    };
  }, [isOpen, scannerMode]);

  const initializeCamera = async () => {
    try {
      // Check for camera permission
      const permission = await navigator.permissions.query({ name: 'camera' });
      setHasPermission(permission.state === 'granted');

      // Get available cameras
      const devices = await Html5Qrcode.getCameras();
      setCameras(devices);

      if (devices.length > 0) {
        startScanning(devices[selectedCamera]?.id || devices[0].id);
      }
    } catch (error) {
      console.error('Camera initialization error:', error);
      setHasPermission(false);
      onError?.(error);
    }
  };

  const startScanning = async (cameraId) => {
    try {
      setIsScanning(true);
      
      const scanner = new Html5Qrcode('qr-scanner-element');
      setScannerInstance(scanner);

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        disableFlip: false,
      };

      await scanner.start(
        cameraId,
        config,
        (decodedText, decodedResult) => {
          handleScanSuccess(decodedText, decodedResult);
        },
        (errorMessage) => {
          // Ignore frequent scanning errors
          if (!errorMessage.includes('No QR code found')) {
            console.warn('QR scan error:', errorMessage);
          }
        }
      );
    } catch (error) {
      console.error('Scanner start error:', error);
      setIsScanning(false);
      toast.error('Failed to start camera scanner');
    }
  };

  const stopScanning = async () => {
    if (scannerInstance) {
      try {
        await scannerInstance.stop();
        setScannerInstance(null);
        setIsScanning(false);
      } catch (error) {
        console.error('Scanner stop error:', error);
      }
    }
  };

  const handleScanSuccess = (decodedText, decodedResult) => {
    setScanResult({
      text: decodedText,
      result: decodedResult,
      timestamp: new Date().toISOString(),
    });
    
    // Stop scanning after successful scan
    stopScanning();
    
    // Call the onScan callback
    onScan?.(decodedText, decodedResult);
    
    toast.success('QR Code scanned successfully!');
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.trim()) {
      handleScanSuccess(manualCode.trim(), { manual: true });
      setManualCode('');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const html5QrCode = new Html5Qrcode('file-scanner-element');
      
      html5QrCode.scanFile(file, true)
        .then(decodedText => {
          handleScanSuccess(decodedText, { file: file.name });
        })
        .catch(err => {
          console.error('File scan error:', err);
          toast.error('Could not scan QR code from image');
          onError?.(err);
        });
    }
  };

  const switchCamera = async () => {
    if (cameras.length > 1) {
      await stopScanning();
      const nextCamera = (selectedCamera + 1) % cameras.length;
      setSelectedCamera(nextCamera);
      await startScanning(cameras[nextCamera].id);
    }
  };

  const toggleFlashlight = () => {
    // Note: Flashlight control is limited in web browsers
    // This is a placeholder for future implementation
    setFlashlightOn(!flashlightOn);
    toast.info('Flashlight control not available in browser');
  };

  const renderCameraScanner = () => (
    <div className="space-y-4">
      <div className="relative">
        <div 
          id="qr-scanner-element" 
          ref={scannerRef}
          className="w-full max-w-md mx-auto rounded-2xl overflow-hidden bg-black"
          style={{ aspectRatio: '1' }}
        />
        
        {/* Scanner overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-4 border-4 border-sage-500 rounded-2xl">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl"></div>
          </div>
          
          {/* Scanning line animation */}
          {isScanning && (
            <div className="absolute inset-4 overflow-hidden rounded-2xl">
              <div className="w-full h-1 bg-sage-500 animate-scan opacity-75"></div>
            </div>
          )}
        </div>
      </div>

      {/* Camera controls */}
      <div className="flex justify-center space-x-4">
        {cameras.length > 1 && (
          <button
            onClick={switchCamera}
            className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            title="Switch Camera"
          >
            <RotateCcw className="w-5 h-5 text-gray-600" />
          </button>
        )}
        
        <button
          onClick={toggleFlashlight}
          className={`p-3 rounded-full transition-colors ${
            flashlightOn ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          title="Toggle Flashlight"
        >
          <Flashlight className="w-5 h-5" />
        </button>
      </div>

      <p className="text-center text-sm text-gray-600">
        Position the QR code within the frame to scan
      </p>
    </div>
  );

  const renderManualEntry = () => (
    <form onSubmit={handleManualSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter QR Code manually
        </label>
        <input
          type="text"
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
          placeholder="Paste or type QR code content here..."
          className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        disabled={!manualCode.trim()}
        className="w-full py-3 bg-sage-500 text-white rounded-xl font-medium hover:bg-sage-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Process Code
      </button>
    </form>
  );

  const renderFileUpload = () => (
    <div className="space-y-4">
      <div 
        id="file-scanner-element" 
        className="hidden"
      />
      
      <div className="text-center">
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-sage-300 rounded-xl p-8 hover:border-sage-400 transition-colors cursor-pointer"
        >
          <Upload className="w-12 h-12 text-sage-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">Upload QR Code Image</p>
          <p className="text-sm text-gray-600">Click to select an image file containing a QR code</p>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );

  const renderModeSelector = () => (
    <div className="flex bg-sage-100 rounded-xl p-1 mb-6">
      <button
        onClick={() => {
          setScannerMode('camera');
          setScanResult(null);
        }}
        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
          scannerMode === 'camera' 
            ? 'bg-white text-sage-700 shadow-sm' 
            : 'text-sage-600 hover:text-sage-700'
        }`}
      >
        <Camera className="w-4 h-4" />
        <span>Camera</span>
      </button>
      
      {showManualEntry && (
        <>
          <button
            onClick={() => {
              setScannerMode('manual');
              stopScanning();
              setScanResult(null);
            }}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
              scannerMode === 'manual' 
                ? 'bg-white text-sage-700 shadow-sm' 
                : 'text-sage-600 hover:text-sage-700'
            }`}
          >
            <Type className="w-4 h-4" />
            <span>Manual</span>
          </button>
          
          <button
            onClick={() => {
              setScannerMode('upload');
              stopScanning();
              setScanResult(null);
            }}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
              scannerMode === 'upload' 
                ? 'bg-white text-sage-700 shadow-sm' 
                : 'text-sage-600 hover:text-sage-700'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
        </>
      )}
    </div>
  );

  const renderScanResult = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-3"
    >
      <div className="flex items-center space-x-2">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span className="font-medium text-green-900">Scan Successful!</span>
      </div>
      
      <div className="bg-white rounded-lg p-3">
        <p className="text-sm text-gray-600 mb-1">Scanned Content:</p>
        <p className="font-mono text-sm bg-gray-50 p-2 rounded border break-all">
          {scanResult.text}
        </p>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={() => {
            setScanResult(null);
            if (scannerMode === 'camera') {
              initializeCamera();
            }
          }}
          className="flex-1 py-2 px-4 bg-sage-500 text-white rounded-lg font-medium hover:bg-sage-600 transition-colors"
        >
          Scan Another
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-2 px-4 border border-sage-300 text-sage-700 rounded-lg font-medium hover:bg-sage-50 transition-colors"
        >
          Close
        </button>
      </div>
    </motion.div>
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sage-100 rounded-xl flex items-center justify-center">
                <QrCode className="w-5 h-5 text-sage-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">QR Scanner</h3>
                <p className="text-sm text-gray-600">Scan or enter product code</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Selector */}
          {!scanResult && renderModeSelector()}

          {/* Scanner Content */}
          <div className="space-y-6">
            {scanResult ? (
              renderScanResult()
            ) : hasPermission === false && scannerMode === 'camera' ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Camera Permission Required</h4>
                <p className="text-gray-600 mb-4">Please allow camera access to scan QR codes</p>
                <button
                  onClick={() => setScannerMode('manual')}
                  className="px-4 py-2 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
                >
                  Use Manual Entry Instead
                </button>
              </div>
            ) : (
              <>
                {scannerMode === 'camera' && renderCameraScanner()}
                {scannerMode === 'manual' && renderManualEntry()}
                {scannerMode === 'upload' && renderFileUpload()}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QRScanner;
