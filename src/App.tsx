import './App.css'
import CustomBtn from '@components/button/component'
import { useGetUsers } from '@enteties/hooks/use-query-get-users'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import CustomTable from '@widgets/table/component'
import { ColumnsData } from '@shared/mocks/columnsTableUsers'
import { useMutationDeleteUser } from '@enteties/hooks/use-mutation-delete-user'
import { useDisclosure } from '@nextui-org/react'
import ModalCustom from '@widgets/modal/component'
import { UserTypeForm } from '@widgets/form/types'
import { useMutationCreateUser } from '@enteties/hooks/use-mutation-create-user'
import { useNavigate } from 'react-router-dom'
// import { useQueryFindUser } from '@enteties/hooks/use-query-find-user'

function App() {

  const { data, fetchNextPage, isFetchingNextPage } = useGetUsers()
  const navigate = useNavigate();
  // const { data: editData } = useQueryFindUser()
  const { mutateAsync: deleteAsync } = useMutationDeleteUser()
  const { mutateAsync: createAsync } = useMutationCreateUser()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  const handleDelete = (payload: string) => {
    deleteAsync(payload)
  }

  const handleEdit = (payload: string) => {
    navigate(`/your-path?id=${payload}`); // Убедитесь, что ваш путь корректен
  };

  const handleSubmit = (payload: UserTypeForm) => {
    createAsync(payload)
  }

  const pages = data?.pages?.map((page) => ({
    currentPage: page.currentPage,
    nextPage: page.nextPage,
    data: page.data || [],
  })) || [];

  const usersChange = pages.map((user) => user.data).flat()

  return (
    <>
      <div className='space-y-10'>
        <CustomBtn onClick={onOpen}>Добавить</CustomBtn>
        <ModalCustom onOpenChange={onOpenChange} isOpen={isOpen} onSubmit={handleSubmit} />
        <div>
          <CustomTable
            onDelete={handleDelete}
            onEdit={handleEdit}
            ref={ref}
            isFetchingNextPage={isFetchingNextPage}
            users={usersChange}
            columns={ColumnsData} />
        </div>
      </div>
    </>
  )
}

export default App
