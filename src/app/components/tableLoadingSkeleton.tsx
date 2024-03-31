const TableLoadingSkeleton = () => <div className="bg-white p-10 my-5 rounded-box">
    <div className="flex flex-col gap-4">
        <div className="w-full skeleton h-6"></div>
        <div className="w-2/4 skeleton h-6"></div>
        <div className="w-2/4 skeleton h-6"></div>
    </div>
</div>

export default TableLoadingSkeleton