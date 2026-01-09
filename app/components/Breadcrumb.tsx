'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if not provided
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    // Don't add "Home" for dashboard routes
    if (!pathname.startsWith('/dashboard')) {
      breadcrumbs.push({ label: 'Home', href: '/' });
    }

    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      
      // Format label (capitalize and replace hyphens)
      const label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      breadcrumbs.push({
        label,
        href: index === paths.length - 1 ? undefined : currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <span className="text-gray-500">/</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-400 font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
