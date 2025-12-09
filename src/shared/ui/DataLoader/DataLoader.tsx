import {Spinner} from '@heroui/spinner';

export function DataLoader(){
    return <div className="w-full h-full p-20 flex justify-center items-center">
        <Spinner size='lg' color='primary' label='Загрузка...'/>
    </div>
}