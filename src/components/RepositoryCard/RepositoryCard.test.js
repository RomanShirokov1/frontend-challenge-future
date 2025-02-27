import { render, screen } from '@testing-library/react';
import RepositoryCard from './index';
import '@testing-library/jest-dom';

describe('RepositoryCard Component', () => {
  const mockProps = {
    id: 1,
    name: 'Test Repository',
    description: 'This is a test repository',
    html_url: 'https://github.com/test/repo',
    stargazers_count: 10,
    updated_at: '2023-01-01T00:00:00Z',
  };

  test('renders repository name', () => {
    render(<RepositoryCard {...mockProps} />);
    const nameElement = screen.getByTestId('repository-name');
    expect(nameElement).toBeInTheDocument();
  });

  test('renders repository description', () => {
    render(<RepositoryCard {...mockProps} />);
    const descriptionElement = screen.getByText(/This is a test repository/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders default description when none is provided', () => {
    const { rerender } = render(<RepositoryCard {...{ ...mockProps, description: null }} />);
    const descriptionElement = screen.getByText(/нет описания/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders stargazers count', () => {
    render(<RepositoryCard {...mockProps} />);
    const starsElement = screen.getByText(/⭐ 10/i);
    expect(starsElement).toBeInTheDocument();
  });

  test('renders updated date', () => {
    render(<RepositoryCard {...mockProps} />);
    const updatedAtElement = screen.getByText(/обновлено: 01\/01\/2023/i);
    expect(updatedAtElement).toBeInTheDocument();
  });

  test('renders link to repository', () => {
    render(<RepositoryCard {...mockProps} />);
    const linkElement = screen.getByRole('link', { name: /test repository/i });
    expect(linkElement).toHaveAttribute('href', mockProps.html_url);
  });
});
