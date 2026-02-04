import {Spinner} from '@heroui/spinner';

interface Props{
    label?: string
}

export function DataLoader({label} : Props){
    return <div className="w-full h-full p-20 flex justify-center items-center">
        <Spinner size='lg' color='primary' label={label ?? 'Загрузка...'}/>
    </div>
}