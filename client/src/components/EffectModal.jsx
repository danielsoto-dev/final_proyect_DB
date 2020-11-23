import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/core';

export default function EffectModal({
  isOpen,
  onClose,
  effectTitle = 'None',
  onEffect = () => alert('working'),
  children,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{effectTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody> {children}</ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onEffect}>
              Guardar
            </Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
