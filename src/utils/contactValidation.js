import * as Yup from 'yup';

// List of popular country codes with ISO flags
export const COUNTRY_CODES = [
  { code: '+91', iso: 'IN', name: 'India', flag: '🇮🇳' },
  { code: '+1', iso: 'US', name: 'United States', flag: '🇺🇸' },
  { code: '+44', iso: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+971', iso: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: '+61', iso: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: '+49', iso: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', iso: 'FR', name: 'France', flag: '🇫🇷' },
  { code: '+65', iso: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: '+81', iso: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: '+1', iso: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: '+31', iso: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+41', iso: 'CH', name: 'Switzerland', flag: '🇨🇭' },
];

export const BUDGET_OPTIONS = [
  '$1000',
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000+',
];

// File upload limits
export const MAX_FILE_SIZE_MB = {
  video: 50,
  image: 15,
  pdf: 20,
};

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'video/mp4',
  'video/quicktime',
  'video/webm',
];

/**
 * Initial form state object
 */
export const initialContactValues = {
  fullName: '',
  countryCode: '+91',
  countryIso: 'IN',
  mobileNumber: '',
  companyEmail: '',
  projectBrief: '',
  budget: '$1000',
  files: [],
};

/**
 * Yup schema for validating contact form fields
 */
export const contactValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .required('Please enter your full name'),
  countryCode: Yup.string().required('Country code required'),
  mobileNumber: Yup.string()
    .trim()
    .matches(/^[0-9\s\-()]{6,15}$/, 'Please enter a valid mobile number')
    .required('Please enter your mobile number'),
  companyEmail: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .required('Please enter your company email'),
  projectBrief: Yup.string()
    .trim()
    .min(10, 'Please tell us a bit more about your project (at least 10 characters)')
    .required('Please share a short project brief'),
  budget: Yup.string().required('Please select a budget range'),
});

/**
 * Validates a single file before adding it to the form values
 */
export function validateUploadedFile(file) {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `"${file.name}" has an unsupported format. Please upload PDF, JPG, PNG, or Video.`,
    };
  }

  const isVideo = file.type.startsWith('video/');
  const isImage = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf';

  let maxBytes = 15 * 1024 * 1024;
  if (isVideo) maxBytes = MAX_FILE_SIZE_MB.video * 1024 * 1024;
  else if (isPdf) maxBytes = MAX_FILE_SIZE_MB.pdf * 1024 * 1024;
  else if (isImage) maxBytes = MAX_FILE_SIZE_MB.image * 1024 * 1024;

  if (file.size > maxBytes) {
    const limitMb = isVideo
      ? MAX_FILE_SIZE_MB.video
      : isPdf
      ? MAX_FILE_SIZE_MB.pdf
      : MAX_FILE_SIZE_MB.image;
    return {
      valid: false,
      error: `"${file.name}" exceeds the ${limitMb}MB limit.`,
    };
  }

  return { valid: true };
}

/**
 * Format raw bytes into human readable string
 */
export function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

/**
 * Shortens long file names cleanly for thumbnail labels
 */
export function shortenFileName(name, maxLength = 24) {
  if (!name || name.length <= maxLength) return name;
  const dotIndex = name.lastIndexOf('.');
  if (dotIndex === -1) return `${name.slice(0, maxLength - 3)}...`;
  const ext = name.slice(dotIndex);
  const base = name.slice(0, dotIndex);
  const avail = maxLength - ext.length - 3;
  if (avail <= 3) return `${base.slice(0, 8)}...${ext}`;
  return `${base.slice(0, avail)}...${ext}`;
}
