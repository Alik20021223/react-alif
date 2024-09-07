import './App.css'
import CustomBtn from '@components/button/component'
import { useGetUsers } from '@enteties/hooks/use-query-get-users'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import CustomTable from '@widgets/table/component'
import { ColumnsData } from '@shared/mocks/columnsTableUsers'
import { useMutationDeleteUser } from '@enteties/hooks/use-mutation-delete-user'
import { useDisclosure } from '@nextui-org/react'
import ModalCustom from '@widgets/modal/component'
import { UserTypeForm } from '@widgets/form/types'
import { useMutationCreateUser } from '@enteties/hooks/use-mutation-create-user'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { defaultValue } from '@shared/mocks/defaultValueForm'
import { UserType } from './widgets/table/types'

function App() {

  const { data, fetchNextPage, isFetchingNextPage } = useGetUsers()
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [edit, setEdit] = useState<boolean>(false)
  const { mutateAsync: deleteAsync } = useMutationDeleteUser()
  const { mutateAsync: createAsync } = useMutationCreateUser()
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { ref, inView } = useInView()
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  const handleDelete = (payload: string | undefined) => {
    if (payload) {
      deleteAsync(payload)
    }
  }


  const handleEdit = (user: UserType) => {
    setUser(user)
    onOpen()
    setEdit(true)
  };

  const handleSubmit = (payload: UserTypeForm) => {
    const data = {
      ...payload,
      status: payload.status[0]
    }

    if (edit) {
      console.log(data);
    } else {
      createAsync(data)
    }
  }

  const handleOpenModal = () => {
    onOpen()
    searchParams.delete('id')
    navigate({
      search: searchParams.toString()
    })
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
        <CustomBtn onClick={handleOpenModal}>Добавить</CustomBtn>
        <ModalCustom payload={edit ? user : defaultValue} edit={edit} onOpenChange={onOpenChange} isOpen={isOpen} onSubmit={handleSubmit} />
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
