import '../App.css'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const [loginStatus, setLoginStatus] = useState(true) //ログイン状況を格納するstate

  // 送信ボタンを押したときの挙動
  const onSubmit = data => {
    console.log(data)

    // 入力されたアカウントが正しいか確認
    fetch('https://api-for-missions-and-railways.herokuapp.com/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
        //ログイン成功した場合
        if ('token' in data) {
          console.log('ログイン成功')
          setLoginStatus(true)
        } else {
          // パスワードとメールアドレスが正しくない場合（認証エラー）
          if (data['ErrorCode'] === 403) {
            console.log('ログイン失敗')
            setLoginStatus(false)
          }
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <main>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="example@mail.com"
          {...register('email', {
            required: true,
          })}
        />
        {errors.email?.type === 'required' && 'メールアドレスを入力して下さい'}
        <input
          placeholder="password"
          type="password"
          {...register('password', {
            required: true,
          })}
        />
        {errors.password?.type === 'required' && 'パスワードを入力してくさい'}
        {loginStatus === false &&
          'メールアドレスまたはパスワードが正しくありません'}
        <input type="submit" />
      </form>
    </main>
  )
}
