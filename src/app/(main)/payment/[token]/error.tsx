'use client'

export default function Error(props: { error: Error }) {
  console.log(props.error)
  console.log(props.error.name)
  console.log(props.error.message)
  console.log(props.error.stack)

  return 'Ooppps'
}
