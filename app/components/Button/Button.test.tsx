import React from "react"
import {render, screen, fireEvent} from "@testing-library/react"
import "@testing-library/jest-dom"
import Button from "./Button"

it('renders the button and responds to click events', () => {
    const mockOnClick = jest.fn()
    const buttonLabel = "Click Me"
    render(<Button onClick={mockOnClick}>{buttonLabel}</Button>)

    const buttonElement = screen.getByText(buttonLabel)
    expect(buttonElement).toBeInTheDocument()

    fireEvent.click(buttonElement)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
})

it('matches snapshot', () => {
    const {asFragment} = render(<Button onClick={jest.fn()}>Click Me</Button>)
    expect(asFragment()).toMatchSnapshot()
})