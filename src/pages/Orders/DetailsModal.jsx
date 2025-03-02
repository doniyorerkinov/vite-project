import Modal from "../../components/Base/Modal"
import { MapPin, Phone, Clock, User } from "lucide-react"


const DetailsModal = ({ isOpen, onClose, detail = {} }) => {
  // Mock data for the example (in a real app, this would come from the API)
  const orderItems = [
    { name: "Espresso 30 ml", quantity: 1, price: 15000 },
    { name: "Amerikano 150 ml", quantity: 1, price: 15000 },
  ]

  const deliveryFee = 22400
  const orderTotal = detail.total_price || 0
  const grandTotal = orderTotal + deliveryFee

  // Format date from "2024-07-02 14:56:25" to "03/07/24 в 14:30:44"
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear().toString().slice(2)
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")

    return `${day}/${month}/${year} в ${hours}:${minutes}:${seconds}`
  }

  // Get status badge color based on delivery_status
  const getStatusBadgeClass = (status) => {
    if (!status) return "bg-gray-100 text-gray-800"

    switch (status.toLowerCase()) {
      case "cancelled":
      case "cancelled_with_payment":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "new":
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  // Get payment status badge color
  const getPaymentStatusBadgeClass = (status) => {
    if (!status) return "bg-gray-100 text-gray-800"

    if (status.toLowerCase().includes("paid")) {
      return "bg-green-100 text-green-800"
    } else if (status.toLowerCase().includes("not paid")) {
      return "bg-red-100 text-red-800"
    } else {
      return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="!max-w-[716px]">
        <div className=" p-6 flex flex-col gap-4">
        {/* Header with Order Number and Status */}
        <div className="flex justify-center items-center gap-2">
          <span className="text-xl font-bold">Детали заказа №{detail.id}</span>
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(detail.delivery_status)}`}>
            {detail.delivery_status}
          </span>
        </div>

        {/* Order Info Section */}
        <div className="bg-primary-bg rounded-[10px] p-4">
          <span className="font-medium">О заказе</span>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center border border-primary-green gap-2 rounded-md px-2 py-1">
              <User className="w-4 h-4 text-primary-green" />
              <span className="text-sm">Diyorbe</span>
            </div>
            <div className="flex items-center border border-primary-green gap-2 rounded-md px-2 py-1">
              <Phone className="w-4 h-4 text-primary-green" />
              <span className="text-sm">998932429262</span>
            </div>
            <div className="flex items-center border border-primary-green gap-2 rounded-md px-2 py-1">
              <Clock className="w-4 h-4 text-primary-green" />
              <span className="text-sm">открыт {formatDate(detail.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Section */}
        <div className="border border-primary-bg p-4 rounded-[10px]">
          <h3 className="font-semibold mb-4">Доставка</h3>
          <div className="flex justify-start gap-6">
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Откуда</p>
                <p className="font-medium">MANE CAFE</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Куда</p>
                <p className="font-medium text-blue-600">Tashkent</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="border border-primary-bg p-4 rounded-[10px]">
          <h3 className="font-semibold mb-2">Комментарий</h3>
          <p className="text-sm text-gray-600">{detail.error_reason || "Нет комментариев"}</p>
        </div>

        {/* Products Section */}
        <div className="border border-primary-bg p-4 rounded-[10px]">
          <h3 className="font-semibold mb-4">Товары</h3>
          <div className="space-y-3">
            {orderItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{item.name}</span>
                <div className="flex items-center gap-2">
                  <span>{item.quantity} ×</span>
                  <span className="font-medium">{item.price.toLocaleString()} сум</span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center">
              <span>Сумма заказа</span>
              <span className="font-medium">{orderTotal.toLocaleString()} сум</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Доставка Яндекс</span>
              <span className="font-medium">{deliveryFee.toLocaleString()} сум</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Способ оплаты</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {detail.payment_method === "Cash" ? "Naqd pul orqali" : detail.payment_method}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Статус оплаты</span>
              <span className={`px-3 py-1 rounded-full text-sm ${getPaymentStatusBadgeClass(detail.payment_status)}`}>
                {detail.payment_status === "Not Paid" ? "не оплачен" : detail.payment_status}
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t font-bold">
              <span>Итого к оплате</span>
              <span>{grandTotal.toLocaleString()} сум</span>
            </div>
          </div>
        </div>

        {/* Cancel Button */}
        <button
          className="w-full py-3 bg-gray-100 hover:bg-gray-200 rounded-md text-center transition-colors"
          onClick={onClose}
        >
          Отклонить
        </button>
        </div>
    </Modal>
  )
}

export default DetailsModal

