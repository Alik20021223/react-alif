import './App.css'
import CustomBtn from '@components/button/component'
import { useGetUsers } from '@enteties/hooks/use-query-get-users'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import CustomTable from '@widgets/table/component'
import { ColumnsData } from '@shared/mocks/columnsTableUsers'

function App() {

  const { data, fetchNextPage, isFetchingNextPage } = useGetUsers()
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  console.log(data);
  

  const pages = data?.pages?.map((page) => ({
    currentPage: page.currentPage,
    nextPage: page.nextPage,
    data: page.data || [], // Если data undefined, возвращаем пустой массив
  })) || [];

  // Создаем объект для передачи в CustomTable
  const usersData = {
    pageParams: data?.pageParams || [],
    pages: pages,
  };

  return (
    <>


      <CustomBtn onClick={() => {}}>Добавить</CustomBtn>

      <CustomTable users={usersData} ref={ref} isFetchingNextPage={isFetchingNextPage} columns={ColumnsData} />
    </>
  )
}

export default App
