import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import {
  CREATE_TOTYM_MUTATION,
  UPDATE_TOTYM,
  ADD_ITEM,
  DELETE_ITEM,
  DELETE_TOTYM,
  DELETE_ALL_ITEMS,
} from '../graphql/mutations';
import { initializeApollo } from '../apollo/client';
import Loader from './Loader';
import CreateTotymTitleSection from './ui/CreateTotymTitleSection';
import ItemCard from './ui/ItemCard';
import TotymItem from './ui/TotymItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from './ConfirmModal';

declare global {
  interface Window {
    cloudinary?: any;
  }
}

const StyledContainer = styled.div`
  border: 0;
  box-shadow: none;
  margin: 0 auto;
  max-width: 600px;
  padding: 0;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    border-radius: 0.25rem;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    padding: 2rem;
    max-width: 1200px;
    width: 35rem;
  }
`;

const StyledTitle = styled.h1`
  display: none;

  ${({ theme }) => theme.breakpoints.up('md')} {
    display: block;
    font-style: normal;
    font-weight: bold;
    font-size: 1.25rem;
    line-height: 1rem;
    letter-spacing: -0.05px;
  }
`;

const StyledMobileTitleSection = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  ${({ theme }) => theme.breakpoints.up('md')} {
    display: none;
  }
`;

const StyledMobileTitle = styled(StyledTitle)`
  font-weight: 600;
  font-size: 1rem;

  ${({ theme }) => theme.breakpoints.down('md')} {
    display: flex;
  }
`;

const StyledSubTitle = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.7rem;
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => `${theme.colors.orange}`};

  ${({ theme }) => theme.breakpoints.down('md')} {
    font-size: 0.875rem;
    line-height: 1.125rem;
  }
`;

const StyledItemSection = styled.div`
  padding: 1.25rem 0;

  [data-rbd-draggable-id] {
    left: auto !important;
    top: auto !important;
  }
`;

const StyledButtonSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;

  ${({ theme }) => theme.breakpoints.down('md')} {
    margin-bottom: 5rem;
  }
`;

const StyledItemAddButton = styled(Button)`
  width: 15rem;
  background: ${({ theme }) => `${theme.colors.white}`};
  border: 1px solid ${({ theme }) => `${theme.colors.orange}`};
  box-sizing: border-box;
  border-radius: 0.313rem;
  padding: 1rem 3.125rem;
  margin-top: 1.75rem;
  font-family: ${({ theme }) => `${theme.fontFamily.body}`};
  font-style: normal;
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.313rem;
  color: ${({ theme }) => `${theme.colors.orange}`};
  letter-spacing: -0.05px;
  text-transform: capitalize;

  &:hover {
    background: transparent;
  }

  &:disabled {
    border: 1px solid ${({ theme }) => `${theme.colors.gray.base100}`};
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 8.75rem;
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
  }
`;

const StyledPublishButton = styled(StyledItemAddButton)`
  background: ${({ theme }) => `${theme.colors.orange}`};
  color: ${({ theme }) => `${theme.colors.white}`};
  margin: 3rem auto;

  &:hover {
    background: ${({ theme }) => `${theme.colors.orange}`};
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    margin: 1rem auto;
  }
`;

const StyledFooterLabel = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-align: center;
  color: ${({ theme }) => `${theme.colors.gray.footerfont}`};
  margin: 1.25rem 0;

  ${({ theme }) => theme.breakpoints.down('md')} {
    font-size: 0.75rem;
    line-height: 1rem;
  }
`;

const StyledConfirmButtonContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function CreateTotym({
  items,
  user,
  totymTitle,
  currentId,
  setCurrentId,
  setTotymTitle,
  setItems,
}) {
  const apolloClient = initializeApollo();
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [confirmType, setConfirmType] = useState('');
  const [selectedItem, setSelectedItem] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (items.length) handleButtonStatus(totymTitle, items[0].name, false);
  }, [items]);

  const onClickUpload = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`,
          defaultSource: 'image_search',
          googleApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY}`,
          multiple: false,
          sources: [
            'url',
            'local',
            'camera',
            'image_search',
            'unsplash',
            'facebook',
            'instagram',
            'google_drive',
          ],
          thumbnails: '.uploadedImages',
          uploadPreset: `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`,
        },
        (error, { event, info }) => {
          if (!error && event === 'success') {
            setUploadedFile(info);
          }
        }
      )
      .open();
  };

  const handleButtonStatus = (
    title: string,
    name: string,
    isPost: boolean = false
  ) => {
    if (items?.length >= 4 && title !== '') {
      setButtonStatus(false);
    } else if (items?.length == 0 && title !== '' && name !== '') {
      setButtonStatus(false);
    } else if (items?.length < 4 && items?.length > 0 && title !== '') {
      setButtonStatus(false);
    } else {
      setButtonStatus(true);
    }
    if (isPost) {
      setButtonStatus(true);
    }
  };

  const handleTitleEvent = (newValue: string) => {
    setTotymTitle(newValue);
    handleButtonStatus(newValue, itemName);
  };

  const handleItemName = (newValue: string) => {
    setItemName(newValue);
    handleButtonStatus(totymTitle, newValue);
  };

  const handleItemDescription = (value: string) => {
    setItemDescription(value);
  };

  const handlePublishEvent = async () => {
    handleButtonStatus(totymTitle, itemName, true);
    let sortedItems = [];
    let conditions = [];
    if (items.length != 0) {
      sortedItems = items.map((item, index) => ({
        address: item.address,
        description: item.description,
        image: item.image,
        link: item.link,
        name: item.name,
        orders: `order-${index}`,
      }));

      conditions = items.map((item, index) => ({
        where: {
          id: {
            equals: item.id,
          },
        },
        data: {
          name: {
            set: item.name,
          },
          description: {
            set: item.description,
          },
          image: {
            set: item.image,
          },
          link: {
            set: item.link,
          },
          address: {
            set: item.address,
          },
          orders: {
            set: `order-${index}`,
          },
        },
      }));
    }
    if (itemName != '') {
      sortedItems.push({
        name: itemName,
        description: itemDescription,
        image: uploadedFile?.secure_url,
      });
    }
    if (currentId != 0) {
      if (itemName != '') {
        try {
          const { data } = await apolloClient.mutate({
            mutation: ADD_ITEM,
            variables: {
              name: itemName,
              description: itemDescription,
              image: uploadedFile?.secure_url,
              orders: `order-${items.length}`,
              totym: {
                connect: {
                  id: currentId,
                },
              },
            },
          });
          if (!data) return <Loader />;
        } catch (error) {
          console.error(error);
        }
      }
      try {
        const { data } = await apolloClient.mutate({
          mutation: UPDATE_TOTYM,
          variables: {
            id: currentId,
            title: {
              set: totymTitle,
            },
            user: {
              connect: {
                id: user.id,
              },
            },
            items: {
              updateMany: conditions,
            },
          },
        });
        if (!data) return <Loader />;
        else {
          toast.success('Successfully Updated', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
          setItemName('');
          setItemDescription('');
          setUploadedFile(null);
          router.push('/');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const { data } = await apolloClient.mutate({
          mutation: CREATE_TOTYM_MUTATION,
          variables: {
            title: totymTitle,
            user: {
              connect: {
                id: user.id,
              },
            },
            items: {
              createMany: {
                data: sortedItems,
              },
            },
          },
        });
        if (!data) return <Loader />;
        else {
          setCurrentId(data.createTotym.id);
          toast.success('Successfully Published', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
          setItemName('');
          setItemDescription('');
          setUploadedFile(null);
          router.push('/');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAddItem = async () => {
    if (currentId != 0) {
      handleButtonStatus(totymTitle, itemName, true);
      try {
        const { data } = await apolloClient.mutate({
          mutation: ADD_ITEM,
          variables: {
            name: itemName,
            description: itemDescription,
            image: uploadedFile?.secure_url,
            orders: `order-${items.length}`,
            totym: {
              connect: {
                id: currentId,
              },
            },
          },
        });
        if (!data) return <Loader />;
        else {
          let tempItems = [...items];
          const newItem = {
            ...data.createItem,
            ['isOpen']: false,
            ['currentElement']: 'name',
          };
          tempItems[tempItems.length] = newItem;
          setItems(tempItems);
          toast.success('Successfully Added', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
          });
          handleButtonStatus(totymTitle, itemName, false);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      if (itemName == '') return;
      setItems([
        ...items,
        {
          id: Date.now(),
          name: itemName,
          image: uploadedFile?.secure_url,
          description: itemDescription,
          isOpen: false,
          currentElement: 'name',
        },
      ]);
    }
    setItemName('');
    setItemDescription('');
    setUploadedFile(null);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    handleButtonStatus(totymTitle, '', false);

    const tempitems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(tempitems);
  };

  const DeleteItem = (id) => {
    let deletedIndex = -1;
    let temp = [...items];
    temp.forEach((element, index) => {
      if (element.id == id) {
        deletedIndex = index;
      }
    });
    if (deletedIndex > -1) {
      temp.splice(deletedIndex, 1);
      setItems(temp);
    }
  };

  const handleDeleteItem = async (id) => {
    if (currentId != 0) {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_ITEM,
        variables: {
          id: id,
        },
      });
      if (data) {
        toast.success('Successfully Deleted', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
      }
    }
    DeleteItem(id);
  };

  const handleUpdateItem = (index, newItem) => {
    let tempItems = [...items];
    tempItems[index] = newItem;
    setItems(tempItems);
  };

  const handleRemove = (type, id = 0) => {
    setConfirmType(type);
    setSelectedItem(id);
    setShowModal(true);
  };

  const handleRemoveTotym = async () => {
    const { data: allItems } = await apolloClient.mutate({
      mutation: DELETE_ALL_ITEMS,
      variables: {
        totymId: currentId,
      },
    });
    if (allItems) {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_TOTYM,
        variables: {
          id: currentId,
        },
      });
      if (data) {
        toast.success('Successfully Deleted', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
        router.push('/');
      }
    }
  };

  const handleConfirm = (type) => {
    if (type === 'totym') {
      handleRemoveTotym();
    } else {
      handleDeleteItem(selectedItem);
    }
    setShowModal(false);
  };

  if (!items) return null;
  return (
    <StyledContainer>
      <StyledTitle>Create Page</StyledTitle>
      <StyledMobileTitleSection>
        <StyledMobileTitle>New Totym</StyledMobileTitle>
      </StyledMobileTitleSection>
      <StyledSubTitle>Build a totym for friends to find!</StyledSubTitle>
      <CreateTotymTitleSection
        user={user}
        totymTitle={totymTitle}
        handleTitleEvent={(e) => handleTitleEvent(e.target.value)}
      />
      <StyledItemSection>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <>
                  {items.map((item: any, index: number) => {
                    return (
                      <ItemCard
                        index={index}
                        handleUpdateItem={handleUpdateItem}
                        handleDeleteItem={handleRemove}
                        item={item}
                        key={item.id}
                      />
                    );
                  })}
                </>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </StyledItemSection>
      {((items && items.length < 4) ||
        (currentId == 0 && items.length < 4)) && (
        <TotymItem
          uploadedFile={uploadedFile}
          onClickUpload={() => onClickUpload()}
          itemName={itemName}
          handleItemName={(e) => handleItemName(e.target.value)}
          itemDescription={itemDescription}
          handleItemDescription={(e) => handleItemDescription(e.target.value)}
        />
      )}
      <StyledButtonSection>
        {((items && items.length < 4) ||
          (currentId == 0 && items.length < 4)) && (
          <StyledItemAddButton
            onClick={() => handleAddItem()}
            disabled={itemName == '' || totymTitle == ''}
          >
            Add totym item
          </StyledItemAddButton>
        )}
        <StyledPublishButton
          onClick={() => handlePublishEvent()}
          disabled={buttonStatus || items.length == 0}
        >
          Publish
        </StyledPublishButton>
        <StyledFooterLabel>
          Don't worry, you can update your totym anytime!
        </StyledFooterLabel>
        <StyledItemAddButton
          onClick={() => handleRemove('totym')}
          disabled={currentId === 0}
        >
          Remove totym
        </StyledItemAddButton>
      </StyledButtonSection>
      <ConfirmModal show={showModal} onClose={() => setShowModal(false)}>
        <StyledSubTitle>
          Are you sure you want to delete {confirmType}?
        </StyledSubTitle>
        <StyledConfirmButtonContent>
          <StyledItemAddButton onClick={() => setShowModal(false)}>
            Cancel
          </StyledItemAddButton>
          <StyledItemAddButton onClick={() => handleConfirm(confirmType)}>
            Confirm
          </StyledItemAddButton>
        </StyledConfirmButtonContent>
      </ConfirmModal>
    </StyledContainer>
  );
}
