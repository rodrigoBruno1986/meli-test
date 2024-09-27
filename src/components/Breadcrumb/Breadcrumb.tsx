// Breadcrumb.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; // Asegúrate de tener el archivo CSS

interface BreadcrumbProps {
  categories: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categories }) => {
  return (
    <nav className='breadcrumb'>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to='#'>{category}</Link>
            {index < categories.length - 1 && ' > '}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
