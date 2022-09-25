import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

const OLD_ENV = process.env

beforeEach(() => {
  jest.resetModules() // Most important - it clears the cache
  process.env = { ...OLD_ENV } // Make a copy
})

afterAll(() => {
  process.env = OLD_ENV // Restore old environment
})

test('renders process env', () => {
  process.env.name = 'testing'
  render(<App />)
  const linkElement = screen.getByText(/testing/i)
  expect(linkElement).toBeInTheDocument()
})
