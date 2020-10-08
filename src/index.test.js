import { fireEvent, getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom
let container

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    container = dom.window.document.body
  })

  it('shows a button on the page', () => {
    expect(container.querySelector('button')).not.toBeNull()
  })

  it('creates neat text when the button is clicked', async () => {
    const button = getByText(container, 'Get Neat Text')

    fireEvent.click(button)
    let clickParagraph = container.querySelectorAll('#click-container p')
    expect(clickParagraph.length).toBe(1)

    fireEvent.click(button)
    clickParagraph = container.querySelectorAll('#click-container p')
    expect(clickParagraph.length).toBe(1)

  })

})
