import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { MockedProvider } from '@apollo/client/testing'

it('renders learn react link', () => {
  render(
    <MockedProvider mocks={[]}>
      <App />
    </MockedProvider>
  )
  const linkElement = screen.getByText(/hello world/i)
  expect(linkElement).toBeInTheDocument()
})
