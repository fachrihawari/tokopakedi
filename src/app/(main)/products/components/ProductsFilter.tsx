import { IoMdStar } from "react-icons/io";

export default function ProductsFilter() {
  return (
    <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-4" >
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Filter</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select className="w-full p-2 border rounded text-sm">
              <option>Semua Kategori</option>
              <option>Elektronik</option>
              <option>Fashion</option>
              <option>Rumah Tangga</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rentang Harga</label>
            <div className="flex items-center">
              <input type="number" placeholder="Rp Min" className="w-1/2 p-2 border rounded-l text-sm" />
              <input type="number" placeholder="Rp Max" className="w-1/2 p-2 border rounded-r text-sm" />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center text-sm">
                  <input type="checkbox" className="mr-2" />
                  <IoMdStar size={18} className="text-yellow-500 mr-1" />
                  {rating} ke atas
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-sm font-medium">
            Terapkan Filter
          </button>
        </form>
      </div>
    </div>

  );
}
