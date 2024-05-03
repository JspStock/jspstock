import { Metadata } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Stats from "@/app/components/dashboard/stats";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const TableLoaderSkeleton = dynamic(() => import('@/app/components/tableLoadingSkeleton'))
const Datepicker = dynamic(() => import('@/app/components/datePicker'))

export const metadata: Metadata = {
  title: 'Dashboard'
}

export interface SearchParams {
  date?: string
}

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const role = cookies().get('role')?.value
  const session = await getServerSession()

  if(role == "OWNER"){
    return (
      <div className="p-5 bg-white rounded-lg">
        <h1 className="text-gray-900 font-bold text-xl lg:text-2xl">Selamat Datang {session?.user?.name}</h1>
        <div className="flex justify-end w-full">
          <Datepicker />
        </div>
  
        <Suspense key={`${searchParams.date}`} fallback={<TableLoaderSkeleton />}>
          <Stats searchParams={searchParams} />
        </Suspense>
      </div>
    );
  }else{
    return redirect("/produk/listproduk")
  }
}
