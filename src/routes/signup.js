import '../App.css'
import { useForm } from 'react-hook-form'

export function Signup() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = data => {
    console.log(data)

    fetch('https://api-for-missions-and-railways.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <main>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="name" {...register('name', { required: true })} />
        {errors.name?.type === 'required' && '名前を入力して下さい'}
        <input
          placeholder="example@mail.com"
          {...register('email', {
            required: true,
            maxLength: 60,
            pattern:
              /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
          })}
        />
        {errors.email?.type === 'required' && 'メールアドレスを入力して下さい'}
        {errors.email?.type === 'pattern' && 'メールアドレスの形式が不正です'}
        {errors.email?.type === 'maxLength' && '60文字以内で入力して下さい'}
        <input
          placeholder="password"
          type="password"
          {...register('password', {
            required: true,
            minLength: 8,
          })}
        />
        {errors.password?.type === 'required' && 'パスワードを入力してくさい'}
        {errors.password?.type === 'minLength' && '8文字以上で入力して下さい'}
        <input type="submit" />
      </form>
    </main>
  )
}
