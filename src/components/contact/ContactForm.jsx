import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Video,
  Image as ImageIcon,
  FileText,
  X,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Upload,
} from 'lucide-react';
import {
  contactValidationSchema,
  initialContactValues,
  COUNTRY_CODES,
  BUDGET_OPTIONS,
  validateUploadedFile,
  formatBytes,
  shortenFileName,
} from '../../utils/contactValidation';

/**
 * ContactForm Component
 * Right column displaying the "Let's Make Your Idea Real." form with Formik & Yup,
 * single object state management, drag & drop multi-file upload with video/image/pdf icons,
 * custom country selector (+91), budget selector, and try/catch submit handler.
 */
export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState({ state: 'idle', message: '' });
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState('');

  const countryDropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  // Close country dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setIsCountryOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Formik handles all form fields as a single state object (values)
  const formik = useFormik({
    initialValues: initialContactValues,
    validationSchema: contactValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);
        setSubmitStatus({ state: 'loading', message: 'Sending your inquiry...' });

        // Simulated network request
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Output form data object to console as requested
        console.log('✅ Contact Form Submitted Data:', {
          fullName: values.fullName,
          mobileNumber: `${values.countryCode} ${values.mobileNumber}`,
          companyEmail: values.companyEmail,
          projectBrief: values.projectBrief,
          budget: values.budget,
          files: values.files.map((f) => ({
            name: f.name,
            size: formatBytes(f.size),
            type: f.type,
          })),
          submittedAt: new Date().toISOString(),
        });

        // Set success message state
        setSubmitStatus({
          state: 'success',
          message:
            "Thank you! Your project brief has been received. We'll be in touch within 1 business day.",
        });

        resetForm();
      } catch (error) {
        console.error('❌ Error submitting contact form:', error);
        setSubmitStatus({
          state: 'error',
          message: 'An error occurred while submitting. Please try again.',
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Handle file addition with validation and multi-select support
  const handleFilesAdded = (incomingFiles) => {
    setFileError('');
    const newValidFiles = [];

    for (let i = 0; i < incomingFiles.length; i++) {
      const file = incomingFiles[i];
      const validation = validateUploadedFile(file);
      if (!validation.valid) {
        setFileError(validation.error);
        return;
      }
      // Avoid duplicate uploads of same name & size
      const isDuplicate = formik.values.files.some(
        (existing) => existing.name === file.name && existing.size === file.size
      );
      if (!isDuplicate) {
        newValidFiles.push(file);
      }
    }

    if (newValidFiles.length > 0) {
      formik.setFieldValue('files', [...formik.values.files, ...newValidFiles]);
    }
  };

  const removeFile = (indexToRemove) => {
    const updated = formik.values.files.filter((_, idx) => idx !== indexToRemove);
    formik.setFieldValue('files', updated);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesAdded(e.dataTransfer.files);
    }
  };

  // Filter country list by user search term
  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch) ||
      c.iso.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <div className="contact-form-wrapper w-full h-full bg-white p-7 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-start">
      {/* Column Heading */}
      <h2 className="font-serif text-[#092521] text-[34px] sm:text-[44px] md:text-[52px] leading-[1.15] font-normal tracking-tight mb-8 sm:mb-10">
        Let&apos;s Make Your Idea Real.
      </h2>

      {/* Success Notification Banner */}
      {submitStatus.state === 'success' && (
        <div className="mb-6 p-4 rounded-[6px] bg-[#ECFDF5] border border-[#A7F3D0] flex items-start gap-3 text-[#065F46] animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-[#059669]" />
          <div>
            <p className="font-sans font-medium text-[15px]">{submitStatus.message}</p>
            <p className="text-[13px] text-[#047857] mt-1">
              Check your browser console to view the full submitted data object.
            </p>
          </div>
        </div>
      )}

      {/* Error Notification Banner */}
      {submitStatus.state === 'error' && (
        <div className="mb-6 p-4 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] flex items-start gap-3 text-[#991B1B] animate-fadeIn">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-[#DC2626]" />
          <p className="font-sans font-medium text-[15px]">{submitStatus.message}</p>
        </div>
      )}

      {/* Contact Form */}
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 sm:gap-7">
        {/* 1. Full Name Field */}
        <div className="form-field-group flex flex-col">
          <label
            htmlFor="fullName"
            className="text-[13px] sm:text-[14px] text-[#475569] font-sans font-medium mb-1"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="John Doe"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
            className="w-full pb-2 pt-1 border-b border-[#CBD5E1] focus:border-[#092521] text-[16px] sm:text-[17px] text-[#0F172A] placeholder-[#94A3B8] font-sans bg-transparent focus:outline-none transition-colors"
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <span className="text-[12px] text-[#DC2626] mt-1 font-sans">
              {formik.errors.fullName}
            </span>
          )}
        </div>

        {/* 2. Mobile Number with Country Select (+91) */}
        <div className="form-field-group flex flex-col">
          <label
            htmlFor="mobileNumber"
            className="text-[13px] sm:text-[14px] text-[#475569] font-sans font-medium mb-1"
          >
            Mobile Number
          </label>
          <div className="flex items-end gap-3 w-full">
            {/* Country Selector Dropdown */}
            <div className="relative shrink-0" ref={countryDropdownRef}>
              <button
                type="button"
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="flex items-center gap-1.5 pb-2 pt-1 border-b border-[#CBD5E1] focus:border-[#092521] text-[15px] sm:text-[16px] font-sans font-medium text-[#092521] cursor-pointer bg-transparent focus:outline-none"
                aria-haspopup="listbox"
                aria-expanded={isCountryOpen}
              >
                <span>{formik.values.countryIso}</span>
                <span>{formik.values.countryCode}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#64748B] transition-transform duration-200" />
              </button>

              {isCountryOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-[8px] shadow-2xl border border-black/10 py-2 z-50 max-h-60 overflow-y-auto">
                  <div className="px-3 pb-2 pt-1">
                    <input
                      type="text"
                      placeholder="Search country..."
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full px-2 py-1 text-[13px] border border-gray-200 rounded focus:outline-none focus:border-[#092521]"
                      autoFocus
                    />
                  </div>
                  <ul role="listbox">
                    {filteredCountries.map((item) => (
                      <li
                        key={`${item.iso}-${item.code}`}
                        onClick={() => {
                          formik.setFieldValue('countryCode', item.code);
                          formik.setFieldValue('countryIso', item.iso);
                          setIsCountryOpen(false);
                          setCountrySearch('');
                        }}
                        className="px-3 py-1.5 text-[14px] text-gray-700 hover:bg-[#F1F5F9] cursor-pointer flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{item.flag}</span>
                          <span className="font-medium">{item.name}</span>
                        </span>
                        <span className="text-gray-400 text-xs">{item.code}</span>
                      </li>
                    ))}
                    {filteredCountries.length === 0 && (
                      <li className="px-3 py-2 text-xs text-gray-400 text-center">
                        No country found
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Phone Number Input */}
            <div className="flex-1 flex flex-col">
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                placeholder="+91"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobileNumber}
                className="w-full pb-2 pt-1 border-b border-[#CBD5E1] focus:border-[#092521] text-[16px] sm:text-[17px] text-[#0F172A] placeholder-[#94A3B8] font-sans bg-transparent focus:outline-none transition-colors"
              />
            </div>
          </div>
          {formik.touched.mobileNumber && formik.errors.mobileNumber && (
            <span className="text-[12px] text-[#DC2626] mt-1 font-sans">
              {formik.errors.mobileNumber}
            </span>
          )}
        </div>

        {/* 3. Company Email Field */}
        <div className="form-field-group flex flex-col">
          <label
            htmlFor="companyEmail"
            className="text-[13px] sm:text-[14px] text-[#475569] font-sans font-medium mb-1"
          >
            Company Email
          </label>
          <input
            id="companyEmail"
            name="companyEmail"
            type="email"
            placeholder="johndoe@company.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyEmail}
            className="w-full pb-2 pt-1 border-b border-[#CBD5E1] focus:border-[#092521] text-[16px] sm:text-[17px] text-[#0F172A] placeholder-[#94A3B8] font-sans bg-transparent focus:outline-none transition-colors"
          />
          {formik.touched.companyEmail && formik.errors.companyEmail && (
            <span className="text-[12px] text-[#DC2626] mt-1 font-sans">
              {formik.errors.companyEmail}
            </span>
          )}
        </div>

        {/* 4. Project Brief Area with File Upload Pill & Drag-and-Drop */}
        <div className="form-field-group flex flex-col">
          <label
            htmlFor="projectBrief"
            className="text-[13px] sm:text-[14px] text-[#475569] font-sans font-medium mb-1"
          >
            Project Brief
          </label>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative rounded-[8px] transition-all pb-2 ${
              isDragging
                ? 'border-2 border-dashed border-[#4F46E5] bg-[#EEF2FF]/40'
                : 'border-b border-[#CBD5E1]'
            }`}
          >
            <textarea
              id="projectBrief"
              name="projectBrief"
              rows={3}
              placeholder="Tell us what's on your mind."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.projectBrief}
              className="w-full pt-1 pb-10 text-[16px] sm:text-[17px] text-[#0F172A] placeholder-[#94A3B8] font-sans bg-transparent focus:outline-none resize-none"
            />

            {/* "+ Add your brief file" Pill Button positioned in bottom-right */}
            <div className="absolute right-0 bottom-2.5 flex items-center">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.webp,.mp4,.mov,.webm"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFilesAdded(e.target.files);
                    e.target.value = ''; // Reset input to allow re-uploading same file if deleted
                  }
                }}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#F0EFFC] hover:bg-[#E0E7FF] text-[#4F46E5] hover:text-[#4338CA] text-[13px] sm:text-[14px] font-sans font-medium transition-colors cursor-pointer shadow-sm active:scale-95"
              >
                <span>+ Add your brief file</span>
              </button>
            </div>
          </div>

          {formik.touched.projectBrief && formik.errors.projectBrief && (
            <span className="text-[12px] text-[#DC2626] mt-1 font-sans">
              {formik.errors.projectBrief}
            </span>
          )}

          {/* File validation error feedback */}
          {fileError && (
            <span className="text-[12px] text-[#DC2626] mt-1 font-sans flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {fileError}
            </span>
          )}

          {/* Uploaded Files Preview List with Border, Padding, and Delete Button */}
          {formik.values.files.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2.5">
              {formik.values.files.map((file, idx) => {
                const isVideo = file.type.startsWith('video/');
                const isImage = file.type.startsWith('image/');
                const isPdf = file.type === 'application/pdf';

                return (
                  <div
                    key={`${file.name}-${idx}`}
                    className="flex items-center gap-2 pl-3 pr-2 py-1.5 border border-[#E2E8F0] bg-[#F8FAFC] rounded-[6px] shadow-xs hover:border-[#CBD5E1] transition-all"
                  >
                    {/* Specific File Icon */}
                    {isVideo && (
                      <span className="p-1 rounded bg-[#EFF6FF] text-[#2563EB]" title="Video file">
                        <Video className="w-4 h-4" />
                      </span>
                    )}
                    {isImage && (
                      <span
                        className="p-1 rounded bg-[#ECFDF5] text-[#059669]"
                        title="Image file"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </span>
                    )}
                    {isPdf && (
                      <span className="p-1 rounded bg-[#FEF2F2] text-[#DC2626]" title="PDF file">
                        <FileText className="w-4 h-4" />
                      </span>
                    )}
                    {!isVideo && !isImage && !isPdf && (
                      <span className="p-1 rounded bg-[#F1F5F9] text-[#64748B]">
                        <Upload className="w-4 h-4" />
                      </span>
                    )}

                    {/* Short File Name & Formatted Size */}
                    <div className="flex flex-col text-left">
                      <span
                        className="text-[12px] sm:text-[13px] font-sans font-medium text-[#1E293B] truncate max-w-[130px] sm:max-w-[160px]"
                        title={file.name}
                      >
                        {shortenFileName(file.name, 20)}
                      </span>
                      <span className="text-[10px] text-[#64748B] font-mono">
                        {formatBytes(file.size)}
                      </span>
                    </div>

                    {/* Delete Option */}
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="p-1 rounded-full text-[#94A3B8] hover:text-[#DC2626] hover:bg-[#FEE2E2]/60 transition-colors ml-1 cursor-pointer"
                      title="Remove file"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 5. Budget Field */}
        <div className="form-field-group flex flex-col">
          <label
            htmlFor="budget"
            className="text-[13px] sm:text-[14px] text-[#475569] font-sans font-medium mb-1"
          >
            Budget
          </label>
          <div className="relative">
            <select
              id="budget"
              name="budget"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.budget}
              className="w-full pb-2 pt-1 border-b border-[#CBD5E1] focus:border-[#092521] text-[16px] sm:text-[17px] text-[#0F172A] font-sans bg-transparent focus:outline-none appearance-none cursor-pointer pr-6"
            >
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#64748B] absolute right-1 bottom-3 pointer-events-none" />
          </div>
          {formik.touched.budget && formik.errors.budget && (
            <span className="text-[12px] text-[#DC2626] mt-1 font-sans">
              {formik.errors.budget}
            </span>
          )}
        </div>

        {/* Submit Button Centered */}
        <div className="flex flex-col items-center justify-center pt-4 sm:pt-6">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-[170px] sm:w-[190px] py-3.5 bg-[#601228] hover:bg-[#4a0d1e] active:bg-[#380a16] text-[#F9EED6] font-serif text-[20px] sm:text-[22px] rounded-[4px] shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? 'Submitting...' : 'Submit'}
          </button>

          {/* Footer Note */}
          <p className="text-[12px] sm:text-[13px] text-[#64748B] text-center font-sans mt-5">
            We&apos;ll respond within 1 business day. Your information is never shared.
          </p>
        </div>
      </form>
    </div>
  );
}
