import { Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';

import { Header } from '@components/Header';
import { Container, Content, Icon} from './styles';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

export function NewGroup(){
    const [group, setGroup] = useState('');

    const navigation = useNavigation();

    async function handleNew(){
        try{
            if(group.trim().length === 0){
                return Alert.alert('Nova Turma', 'Informe o nome da turma.');
            }

            await groupCreate(group.trim());
            navigation.navigate('players', { group })
            
        } catch(error){
            if(error instanceof AppError){
                Alert.alert('Nova Turma', error.message);
            } else {
                Alert.alert('Nova Turma', 'Não foi possível criar uma nova turma.');
            }
        }
    }

    return(
        <Container>
            <Header showBackButton/>

            <Content>
                <Icon />

                <Highlight
                    title='Nova turma'
                    subtitle='Crie a turma para adicionar as pessoas'
                />

                <Input 
                    placeholder='Nome da turma'
                    onChangeText={setGroup}
                />

                <Button
                    title='Criar'
                    style={{marginTop: 20}}
                    onPress={handleNew}
                />
            </Content>
        </Container>
    )
}