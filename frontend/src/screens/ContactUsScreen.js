import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import Alert from '../components/alert'

const ContactUsScreen = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm()

  const config = {
    headers: {
      'Contetn-Type': 'application/json',
    },
  }

  const onSubmit = async (data) => {
    await axios.post('http://localhost:7777/api/email', data, config)

    reset()
  }

  return (
    <div className='contact'>
      <div>
        <h2 className='contact__title'>Contact Us</h2>
      </div>
      <form className='contact__form' onSubmit={handleSubmit(onSubmit)}>
        <label className='contact__label'>
          First name<span style={{ color: 'red' }}>*</span>
        </label>

        <input
          className={`contact__input ${errors.name && 'invalid'}`}
          type='text'
          {...register('name', { required: 'Name is Required' })}
          onKeyUp={() => {
            trigger('name')
          }}
        />
        {errors.name && <Alert alertType='danger'>{errors.name.message}</Alert>}
        <label className='contact__label'>
          Last name<span style={{ color: 'red' }}>*</span>
        </label>

        <input
          className={`contact__input ${errors.lastName && 'invalid'}`}
          type='text'
          {...register('lastName', { required: 'Last Name is Required' })}
          onKeyUp={() => {
            trigger('lastName')
          }}
        />
        {errors.lastName && (
          <Alert alertType='danger'>{errors.lastName.message}</Alert>
        )}
        <label className='contact__label'>
          Email<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          className={`contact__input ${errors.email && 'invalid'}`}
          type='email'
          placeholder='example@corp.com'
          {...register('email', {
            required: 'Email is Required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          onKeyUp={() => {
            trigger('email')
          }}
        />
        {errors.email && (
          <Alert alertType='danger'>{errors.email.message}</Alert>
        )}
        <label className='contact__label'>Mobile phone number</label>
        <input
          className={`contact__input ${errors.phoneNumber && 'invalid'}`}
          type='tel'
          {...register('phoneNumber', {
            required: 'Phone Number is Required',
            pattern: {
              value:
                /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/,
              message: 'Invalid phone number',
            },
          })}
          placeholder='exp 0903456987'
          onKeyUp={() => {
            trigger('phoneNumber')
          }}
        />
        {errors.phoneNumber && (
          <Alert alertType='danger'>{errors.phoneNumber.message}</Alert>
        )}

        <label className='contact__label'>Message</label>
        <textarea
          className={`contact__textarea ${errors.clientMessage && 'invalid'}`}
          {...register('clientMessage', {
            required: 'Message is Required',
            minLength: {
              value: 10,
              message: 'Minimum Required length is 10',
            },
            maxLength: {
              value: 300,
              message: 'Minimum Required length is 300',
            },
          })}
          placeholder='Start typing...'
          type='text'
          onKeyUp={() => {
            trigger('clientMessage')
          }}></textarea>
        {errors.clientMessage && (
          <Alert alertType='danger'>{errors.clientMessage.message}</Alert>
        )}
        <input type='submit' className='submit-btn' value='Send message' />
      </form>
    </div>
  )
}

export default ContactUsScreen
