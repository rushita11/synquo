/**
 * ArtifactImage component
 * Automatically provides fallback alt text with company name 'Synquo'
 * if alt is not provided or empty.
 */
export default function ArtifactImage({ 
  src, 
  alt, 
  className = '', 
  id,
  loading = 'lazy',
  ...rest 
}) {
  const companyName = 'Synquo';
  const resolvedAlt = alt && typeof alt === 'string' && alt.trim().length > 0 
    ? alt.trim() 
    : companyName;

  return (
    <img
      id={id}
      src={src}
      alt={resolvedAlt}
      className={`artifact-img ${className}`}
      loading={loading}
      draggable="false"
      {...rest}
    />
  );
}
