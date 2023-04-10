import React from 'react';
import { ModalContent, ModalTrigger, Modalroot } from '../../../components/Modal';
import { PropsType } from '../../../data/type/d1';

const ClickModalPost = ({ children }: PropsType) => {
  return (
    <Modalroot>
      <ModalTrigger>{children}</ModalTrigger>
      <ModalContent>z</ModalContent>
    </Modalroot>
  );
};

export default ClickModalPost;
