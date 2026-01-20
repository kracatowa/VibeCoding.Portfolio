/**
 * Skeleton - Composant de chargement générique
 * 
 * Affiche un placeholder animé pendant le chargement.
 * Utilisé pour créer des squelettes de contenu réalistes.
 */

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular',
  width,
  height,
  rounded = 'md'
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%]';
  
  const roundedClasses = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  const variantClasses = {
    text: `h-4 ${roundedClasses.sm}`,
    circular: `${roundedClasses.full}`,
    rectangular: roundedClasses[rounded]
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

/**
 * TableRowSkeleton - Skeleton pour une ligne de tableau
 */
export function TableRowSkeleton({ columns = 9 }: { columns?: number }) {
  return (
    <tr className="border-b border-gray-800">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="py-4 px-4">
          <Skeleton height={16} width={i === 0 ? 120 : i === 2 ? 80 : 60} />
        </td>
      ))}
    </tr>
  );
}

/**
 * CardSkeleton - Skeleton pour une carte source
 */
export function CardSkeleton() {
  return (
    <div className="p-4 rounded-xl border-2 border-gray-700 bg-gray-800/50">
      <div className="flex flex-col items-center">
        <Skeleton variant="circular" width={48} height={48} className="mb-2" />
        <Skeleton height={20} width="70%" />
      </div>
    </div>
  );
}

/**
 * ScheduleGridSkeleton - Skeleton pour la grille de planification
 */
export function ScheduleGridSkeleton({ days = 7 }: { days?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-3">
      {Array.from({ length: days }).map((_, i) => (
        <div
          key={i}
          className="flex flex-row md:flex-col items-center md:items-stretch p-4 rounded-xl border border-gray-700 bg-gray-800/30"
        >
          <div className="flex items-center gap-3 mr-3 md:mb-3 md:mr-0">
            <Skeleton width={40} height={24} rounded="full" />
            <Skeleton height={16} width={60} />
          </div>
          <div className="flex items-center flex-1 w-full">
            <Skeleton height={32} className="w-full" rounded="lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
