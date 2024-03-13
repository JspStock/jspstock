import Filter from "@/app/components/dashboard/svg/filter.svg"
import Image from "next/image";

const FilterDrop =()=>{
    return (
        <details className="dropdown">
        <summary className="flex items-center lg:mx-20 mx-5 mt-5 space-x-2">
          <div className="w-8 rounded p-2 bg-blue-900">
            <Image
              src={Filter}
              width={100}
              height={100}
              alt="Filter"
            />
          </div>
          <h1 className="text-gray-900">Filter</h1>
        </summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-white text-gray-900 rounded-box w-52">
          <li><a>Harian</a></li>
          <li><a>Mingguan</a></li>
          <li><a>Bulanan</a></li>
          <li><a>Tahunan</a></li>
        </ul>
      </details>
    )
}
export default FilterDrop