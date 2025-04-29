import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductItem from '../../src/components/products/ProductItem'

import { describe, it, expect } from 'vitest';
const mockProduct = {
  id: 1,
  brand: 'TestBrand',
  model: 'TestModel',
  price: 100,
  imgUrl: 'https://test.com/image.jpg'
};

describe('ProductItem Component', () => {
  it('renders product information correctly', () => {
    render(
      <Router>
        <ProductItem product={mockProduct} />
      </Router>
    );

    // Check if brand and model are rendered
    expect(screen.getByText('TestBrand TestModel')).toBeInTheDocument();
    
    // Check if price is rendered
    expect(screen.getByText('100€')).toBeInTheDocument();
    
    // Check if image is rendered with correct src and alt
    const image = screen.getByAltText('TestModel');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://test.com/image.jpg');
  });

  it('renders without price when price is not provided', () => {
    const productWithoutPrice = { ...mockProduct, price: null };
    render(
      <Router>
        <ProductItem product={productWithoutPrice} />
      </Router>
    );

    // Check that price badge is not rendered
    expect(screen.queryByText('100€')).not.toBeInTheDocument();
  });

  it('contains correct links to product details', () => {
    render(
      <Router>
        <ProductItem product={mockProduct} />
      </Router>
    );

    // Check if both links point to correct URL
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href', '/details-product/1');
    });
  });

  it('applies correct styles to links', () => {
    render(
      <Router>
        <ProductItem product={mockProduct} />
      </Router>
    );

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveStyle('text-decoration: none');
    });
  });
});