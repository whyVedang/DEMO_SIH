import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MessageSquare, 
  Camera, 
  X, 
  Send, 
  Heart,
  ThumbsUp,
  ThumbsDown,
  Upload,
  Award,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useConsumerStore } from '../../../stores/consumerStore';

const ProductForm = ({ 
  product,
  variant = 'review', // 'review', 'feedback', 'report'
  isOpen,
  onClose,
  onSubmit,
  className = ''
}) => {
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: '',
    pros: [''],
    cons: [''],
    wouldRecommend: null,
    images: [],
    tags: [],
    anonymous: false,
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const { user, addReview } = useConsumerStore();

  const maxSteps = {
    review: 3,
    feedback: 2,
    report: 2,
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayInput = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    // In a real app, you'd upload these to a server
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 5) // Max 5 images
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (variant === 'review' && (!formData.rating || !formData.comment)) {
        toast.error('Please provide a rating and comment');
        return;
      }

      // Submit the form
      const submissionData = {
        ...formData,
        productId: product?.id,
        userId: user?.id,
        timestamp: new Date().toISOString(),
        variant,
      };

      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

      if (variant === 'review') {
        addReview(product?.id, submissionData);
      }

      onSubmit?.(submissionData);
      toast.success(`${variant === 'review' ? 'Review' : 'Feedback'} submitted successfully!`);
      onClose?.();
      
      // Reset form
      setFormData({
        rating: 0,
        title: '',
        comment: '',
        pros: [''],
        cons: [''],
        wouldRecommend: null,
        images: [],
        tags: [],
        anonymous: false,
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRatingStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Rate this product</h3>
        <p className="text-gray-600">How would you rate your experience?</p>
      </div>

      {/* Star Rating */}
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleInputChange('rating', star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="p-1 transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= (hoveredRating || formData.rating)
                  ? 'text-yellow-500 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Rating Labels */}
      {formData.rating > 0 && (
        <div className="text-center">
          <p className="text-lg font-medium text-gray-900">
            {formData.rating === 1 && 'Poor'}
            {formData.rating === 2 && 'Fair'}
            {formData.rating === 3 && 'Good'}
            {formData.rating === 4 && 'Very Good'}
            {formData.rating === 5 && 'Excellent'}
          </p>
        </div>
      )}

      {/* Quick feedback buttons */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">Would you recommend this product?</p>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => handleInputChange('wouldRecommend', true)}
            className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
              formData.wouldRecommend === true
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-gray-200 hover:border-green-300'
            }`}
          >
            <ThumbsUp className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm font-medium">Yes</span>
          </button>
          <button
            type="button"
            onClick={() => handleInputChange('wouldRecommend', false)}
            className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
              formData.wouldRecommend === false
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-gray-200 hover:border-red-300'
            }`}
          >
            <ThumbsDown className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm font-medium">No</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderCommentStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Review Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Summarize your experience..."
          className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Review
        </label>
        <textarea
          value={formData.comment}
          onChange={(e) => handleInputChange('comment', e.target.value)}
          placeholder="Share your detailed experience with this product..."
          rows={6}
          className="w-full px-4 py-3 border border-sage-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent resize-none"
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">Minimum 50 characters</p>
          <p className="text-xs text-gray-500">{formData.comment.length}/500</p>
        </div>
      </div>

      {/* Pros and Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What did you like? (Optional)
          </label>
          {formData.pros.map((pro, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={pro}
                onChange={(e) => handleArrayInput('pros', index, e.target.value)}
                placeholder="Something you liked..."
                className="flex-1 px-3 py-2 border border-sage-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-sage-400"
              />
              {formData.pros.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('pros', index)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('pros')}
            className="text-sm text-sage-600 hover:text-sage-700 font-medium"
          >
            + Add another
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What could be improved? (Optional)
          </label>
          {formData.cons.map((con, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={con}
                onChange={(e) => handleArrayInput('cons', index, e.target.value)}
                placeholder="Something that could be better..."
                className="flex-1 px-3 py-2 border border-sage-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-sage-400"
              />
              {formData.cons.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('cons', index)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('cons')}
            className="text-sm text-sage-600 hover:text-sage-700 font-medium"
          >
            + Add another
          </button>
        </div>
      </div>
    </div>
  );

  const renderPhotosStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Add Photos (Optional)
        </label>
        
        {/* Image Upload Area */}
        <div className="border-2 border-dashed border-sage-300 rounded-xl p-6 text-center hover:border-sage-400 transition-colors">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Camera className="w-12 h-12 text-sage-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Add Photos</p>
            <p className="text-sm text-gray-600">Upload up to 5 images to support your review</p>
          </label>
        </div>

        {/* Uploaded Images */}
        {formData.images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index)
                    }));
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy Options */}
      <div className="space-y-3">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.anonymous}
            onChange={(e) => handleInputChange('anonymous', e.target.checked)}
            className="w-4 h-4 text-sage-600 border-sage-300 rounded focus:ring-sage-500"
          />
          <span className="text-sm text-gray-700">Post anonymously</span>
        </label>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderRatingStep();
      case 2:
        return renderCommentStep();
      case 3:
        return renderPhotosStep();
      default:
        return renderRatingStep();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.rating > 0;
      case 2:
        return formData.comment.length >= 50;
      case 3:
        return true;
      default:
        return false;
    }
  };

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
          className={`bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {variant === 'review' ? 'Write a Review' : 'Send Feedback'}
              </h2>
              {product && (
                <p className="text-sage-600 text-sm mt-1">{product.name}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Indicator */}
          {variant === 'review' && (
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === currentStep
                      ? 'bg-sage-500 text-white'
                      : step < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step < currentStep ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div className={`w-12 h-1 mx-2 ${
                      step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-sage-100">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-6 py-3 border border-sage-300 text-sage-700 rounded-xl font-medium hover:bg-sage-50 transition-colors"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < maxSteps[variant] ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceed()}
                  className="px-6 py-3 bg-sage-500 text-white rounded-xl font-medium hover:bg-sage-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canProceed() || isSubmitting}
                  className="px-6 py-3 bg-sage-500 text-white rounded-xl font-medium hover:bg-sage-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit {variant === 'review' ? 'Review' : 'Feedback'}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductForm;
