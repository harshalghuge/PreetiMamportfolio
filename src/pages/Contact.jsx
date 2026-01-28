import { useState } from 'react'
import { Button } from '../components/Common'
import { isValidEmail } from '../utils/helpers'
import './pages.css'

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('All fields are required')
      return
    }

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address')
      return
    }

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })

    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section__title">Get In Touch</h2>
        <div className="contact__content">
          <div className="contact__info">
            <h3>Let's talk about everything!</h3>
            <p>Don't like forms? Send me an email. 👋</p>
            <div className="contact__details">
              <div className="contact__item">
                <strong>Email:</strong>
                <a href="mailto:your.email@example.com">your.email@example.com</a>
              </div>
              <div className="contact__item">
                <strong>Phone:</strong>
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </div>
              <div className="contact__item">
                <strong>Location:</strong>
                <p>City, Country</p>
              </div>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            {submitted && (
              <div className="contact__success">Thanks for reaching out! I'll get back to you soon.</div>
            )}
            {error && <div className="contact__error">{error}</div>}

            <div className="form__group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <Button variant="primary" size="lg" type="submit">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
