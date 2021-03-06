import React from 'react';
import { 
	Grid,
	GridItem,
	Button,
	useDisclosure, Textarea,
	Modal, ModalOverlay, ModalContent, 
	ModalHeader, ModalCloseButton, ModalBody,
	ModalFooter, FormControl, FormLabel, Input,
	NumberInput, NumberInputField, NumberInputStepper,
	NumberIncrementStepper, NumberDecrementStepper
} from '@chakra-ui/react';

import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators } from '../../state/index';

import { useForm } from 'react-hook-form';
import FileUpload from '../activities/FileUpload';

var newActToAdd = null;
export default function NewActivityButton() {

	const lastImg = useSelector((state) => state.images.lastImg);
	const dispatch = useDispatch()

	const { addActivityImage, addActivity } = bindActionCreators(
		actionCreators, dispatch
	);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = React.useRef();
  	const finalRef = React.useRef();


	const {
		handleSubmit,
		register,
		control
	} = useForm();

	const onSubmit = values => {
		onClose();
		newActToAdd = {
			...values,
			currentEntries: 0,
			maxEntries: values.maxTeams * values.membersPerTeam
		}
		if(values.eventImg === undefined)
			addActivity(newActToAdd);	
		else
			addActivityImage(values.eventImg);
	};

	useEffect(() => {
		if(lastImg !== null && newActToAdd !== null) {
			addActivity({
				...newActToAdd, imgId: lastImg.file.id
			});
		}
	}, [lastImg]);

	return(
		<>
		<Button 
			w='100%'
			color='black' 
			mt={1}
			onClick={onOpen}
		>
			Crear nueva actividad
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
				<ModalHeader>Añadir nueva actividad</ModalHeader>
				<ModalCloseButton/>
					<ModalBody pb={6}>
						{/* use the argument {required:true} in register*/}
						<FormControl isRequired>
							<FormLabel requiredIndicator="">Nombre de actividad</FormLabel>
							<Input  {...register("eventTitle")} />
						</FormControl>
						<FormControl isRequired mt={4}>
							<FormLabel requiredIndicator="">Descripción</FormLabel>
							<Textarea 
								{...register('description')}
							/>
						</FormControl>
						<FormControl isRequired mt={4}>
							<FileUpload 
								name='eventImg'
								acceptedFileTypes="image/*"
								isRequired={false}
								placeholder="Ningún archivo seleccionado"
								control={control}
							>
								Imagen
							</FileUpload>
						</FormControl>
						<FormControl isRequired mt={4} >
							<Grid templateColumns='repeat(2, 1fr)'>
								<GridItem mr={1}>
									<FormLabel requiredIndicator="">Fecha</FormLabel>
									<Input 
										ref={initialRef} 
										placeholder='fecha'
										{...register('date')}
									/>
								</GridItem>
								<GridItem ml={1}>
									<FormLabel requiredIndicator="">Precio</FormLabel>
									<NumberInput defaultValue={5} min={0} max={1000} maxW='100%'>
										<NumberInputField {...register('price')}/>
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</GridItem>
							</Grid>
							<Grid templateColumns='repeat(2, 1fr)' mt={4}>
								<GridItem mr={1}>
									<FormLabel requiredIndicator="">Número de equipos</FormLabel>
									<NumberInput defaultValue={10} min={2} max={3000} maxW='100%'>
										<NumberInputField {...register('maxTeams')}/>
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</GridItem>
								<GridItem ml={1}>
									<FormLabel requiredIndicator="">Miembros por equipo</FormLabel>
									<NumberInput defaultValue={5} min={0} max={1000} maxW='100%'>
										<NumberInputField {...register('membersPerTeam')}/>
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</GridItem>
							</Grid>
						</FormControl>
						{/* errors will return when field validation fails  */}
						{/*errors.exampleRequired && <span>This field is required</span>*/}
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
