import Swal from "sweetalert2"

const colorClasses = {
  success: 'bg-green-500 hover:bg-green-600',
  error: 'bg-red-500 hover:bg-red-600',
  info: 'bg-blue-500 hover:bg-blue-600'
}

export type SwalOption = {
  message: string
  type: 'success' | 'error' | 'info'
  title?: string
}
export function swal({ type, title, message }: SwalOption) {
  if (message && type) {
    const isError = type === 'error'
    const messageArray = message.split(',')

    const titleHtml = isError && messageArray.length > 1
      ? `<p class="mb-2 text-gray-700">Please correct the following ${message.includes(',') ? 'errors' : 'error'}:</p>` : ''
    const messageHtml = messageArray.length > 1 ?
      `<ul class="list-disc list-inside space-y-1">
        ${messageArray.map((msg) => `<li>${msg.trim()}</li>`).join('')}
      </ul>` : `<p class="text-center">${messageArray[0]}</p>`

    Swal.fire({
      icon: type,
      title: title || type.charAt(0).toUpperCase() + type.slice(1),
      html: `
        <div class="text-left">
          ${titleHtml}
          ${messageHtml}
        </div >
      `,
      customClass: {
        popup: 'rounded-lg shadow-xl border border-gray-200',
        title: `text-2xl font-bold mb-4`,
        htmlContainer: 'text-base',
        confirmButton: `${colorClasses[type]} text-white font-semibold py-2 px-4 rounded`
      },
      buttonsStyling: false,
      showConfirmButton: true,
      confirmButtonText: isError ? 'Try Again' : 'OK',
      showCloseButton: false,
      timer: 8000,
      timerProgressBar: true
    })
  }
}