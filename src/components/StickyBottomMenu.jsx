/**
 * StickyBottomMenu component
 * Pinned at the bottom of the viewport across all sections.
 */
export default function StickyBottomMenu() {
  const menuItems = [
    { label: 'Our Work', href: '#work', id: 'menu-link-work' },
    { label: 'About us', href: '#about', id: 'menu-link-about' },
    { label: 'Book Now', href: '#book', id: 'menu-link-book' },
  ];

  return (
    <div className="sticky-bottom-menu-dock" role="region" aria-label="Sticky bottom navigation dock">
      <nav 
        id="bottom-sticky-nav" 
        className="sticky-bottom-menu-card"
        aria-label="Bottom Navigation"
      >
        {menuItems.map((item) => (
          <a
            key={item.label}
            id={item.id}
            href={item.href}
            className="menu-link"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
