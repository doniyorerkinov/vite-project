import { Plus, Soup } from 'lucide-react';

function Menu() {
  return (
    <div className="flex justify-between h-full">
      {/* Main */}
      <div className="h-full w-full flex justify-center items-center">
        <div className="flex flex-col items-center gap-6 w-[316px]">
          <div className="rounded-full size-[72px] bg-white  flex justify-center items-center">
            <Soup size={24} />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <span>Hech narsa topilmadi</span>
            <span>Bu yerda tanlangan kategoriyadagi ovqatlar turadi</span>
          </div>
          <button className="bg-primary-green !text-white px-4 py-2 rounded-lg hover:bg-primary-green/80 cursor-pointer flex items-center gap-2 w-fit">
            <Plus />
            Ovqat qo'shish
          </button>
        </div>
      </div>
      {/* Right Side */}
      <div className="w-[345px] h-full bg-white">Side</div>
    </div>
  );
}

export default Menu;
