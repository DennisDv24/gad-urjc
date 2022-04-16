import React from "react";
import { 
	Button,
	useDisclosure, Textarea,
	Modal, ModalOverlay, ModalBody, ModalCloseButton, ModalHeader,
	ModalFooter, FormControl, FormLabel, Input,
	ModalContent
} from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state/index';
import { useParams } from 'react-router-dom';

import FileUpload from './FileUpload';


var newTeamToAdd = null;
export default function CreateNewTeamButton() {

	const { id } = useParams();

	const lastImg = useSelector((state) => state.images.lastImg);
	const dispatch = useDispatch()
	const { addTeamImage, addTeam } = bindActionCreators(
		actionCreators, dispatch
	);

	const onSubmit = values => {
		newTeamToAdd = {
			...values,
			currentMembers: 0,
			maxMembers: 5 // TODO it should be based on he PAS
		}
		addTeamImage(values.teamImg);
		onClose();
	};

	useEffect(() => {
		if(lastImg !== null && newTeamToAdd !== null) {
			addTeam({
				...newTeamToAdd, imgId: lastImg.file.id
			}, id);
		}
	}, [lastImg]);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = React.useRef();
	const finalRef = React.useRef();
	//const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const {
		handleSubmit,
		register,
		setError,
		control,
		formState: { errors, isSubmitting },
	} = useForm();
	const inputRef = React.useRef();

	return (
		<>
		<Button
			w='100%'
			onClick={onOpen}
		>
			Crear nuevo equipo
		</Button>
		<Modal
			initialFocusRef={initialRef}
			finalFocusRef={finalRef}
			isOpen={isOpen}
			onClose={onClose}
      	>
			<ModalOverlay />
			<ModalContent>
				<form 
					onSubmit={handleSubmit(onSubmit)}
				>
				<ModalHeader>Crear nuevo equipo</ModalHeader>
				<ModalCloseButton/>
				<ModalBody pb={6}>
					<FormControl>
						<FormLabel>Nombre del equipo</FormLabel>
						<Input ref={initialRef} {...register('teamName')}/>
					</FormControl>
					<FormControl mt={4}>
						<FileUpload 
							name='teamImg'
							acceptedFileTypes="image/*"
							isRequired={false}
							placeholder="Ningún archivo seleccionado"
							control={control}
						>
							Escudo del equipo
						</FileUpload>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button 
						colorScheme='red' 
						bgColor='urjcRed' 
						type='submit'
						mr={3}
					>
						Guardar
					</Button>
					<Button onClick={onClose}>Cancelar</Button>
				</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
		</>
	);
}
