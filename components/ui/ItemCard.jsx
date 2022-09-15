import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Collapse } from '@material-ui/core';
import TextareaAutosize from 'react-textarea-autosize';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ArrowIcon from '../svgs/ArrowIcon';
import DeleteIcon from '../svgs/DeleteIcon';
import UploadIcon from '../svgs/UploadIcon';
import UploadItemImagePlaceholder from '../svgs/UploadItemImagePlaceholder';
import { Draggable } from 'react-beautiful-dnd';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const StyledItem = styled.div`
  align-items: center;
  background: 'transparent';
  border-radius: ${({ isOpen }) => (isOpen ? 'none' : '0.25rem')};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin: 0 1rem 1rem;
  padding: 1rem 0;

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin: 1rem auto;
  }
`;

const StyledItemHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${({ isOpen }) => (isOpen ? '1rem' : '0')};
  padding-left: 2rem;
  position: relative;
  width: 100%;
`;

const ItemHeaderTitle = styled.h1`
  color: ${({ theme }) => `${theme.colors.gray.base900}`};
  font-size: 0.9rem;
  font-style: normal;
  font-weight: normal;
  line-height: 1rem;
  padding: 0.25rem 0;
  width: calc(100% - 3rem);
`;

const StyledArrowIcon = styled.div`
  position: absolute;
  right: 1rem;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const StyledDragIndicatorIcon = styled.div`
  display: flex;
  position: absolute;
  left: 4px;
`;

const StyledTotymSection = styled.div`
  box-sizing: border-box;
  border-radius: 0.25rem;
  padding: 2rem 3.875rem;
  position: relative;

  ${({ theme }) => theme.breakpoints.down('md')} {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    margin: 0 1rem;
    padding: 0.625rem 0 2rem 0;
  }
`;

const StyledTotymTitle = styled.input`
  background: ${({ theme }) => `${theme.colors.white}`};
  border-radius: 0.313rem;
  border: 1px solid ${({ theme }) => `${theme.colors.border.gray002}`};
  color: ${({ theme }) => `${theme.colors.gray.base900}`};
  font-size: 1.125rem;
  margin-bottom: 1.25rem;
  padding: 0.625rem 0.75rem;
  width: 100%;
`;

const StyledTotymDescription = styled(TextareaAutosize)`
  background: ${({ theme }) => `${theme.colors.white}`};
  border-radius: 0.313rem;
  border: 1px solid ${({ theme }) => `${theme.colors.border.gray002}`};
  box-sizing: border-box;
  color: ${({ theme }) => `${theme.colors.gray.base900}`};
  font-size: 1.125rem;
  margin-bottom: 1.25rem;
  padding: 0.625rem 0.75rem;
  width: 100%;
`;

const ItemImageSection = styled.div`
  align-items: center;
  aspect-ratio: 1.87;
  background: radial-gradient(
    224.22% 175.62% at 51.87% 142.52%,
    #fdc912 0%,
    #fdc912 11.98%,
    #f99d39 23.43%,
    #fdc70c 23.44%,
    #ed683c 81.77%,
    #f90101 95.31%
  );
  border-radius: 0.25rem;
  display: flex;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  justify-content: center;
  margin-bottom: 1.25rem;
  padding: ${({ uploadedFile }) => (uploadedFile ? '0' : '1.75rem 3rem')};
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const StyledButton = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0;
  border-radius: 0.25rem;
`;

const StyledSpan = styled.span`
  color: ${({ theme }) => `${theme.colors.white}`};
  font-size: 1.25rem;
  margin-left: 1.625rem;
  white-space: nowrap;
`;

const DeleteIconSetion = styled.div`
  position: absolute;
  bottom: 0;
  right: 1rem;

  ${({ theme }) => theme.breakpoints.down('md')} {
    bottom: -0.5rem;
    right: 0.5rem;
  }
`;

export default function ItemCard({
  index,
  handleDeleteItem,
  item,
  handleUpdateItem,
}) {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

  const handleOpen = () => {
    const newItem = {
      ...item,
      ['isOpen']: !item.isOpen,
    };
    handleUpdateItem(index, newItem);
  };

  const handleUpdateItemInfo = (event) => {
    const newItem = {
      ...item,
      [event.target.name]: event.target.value,
      ['currentElement']: event.target.name,
    };
    handleUpdateItem(index, newItem);
  };

  const handleUpload = () => {
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
            const newItem = {
              ...item,
              ['image']: info.secure_url,
            };
            handleUpdateItem(index, newItem);
          }
        }
      )
      .open();
  };

  if (!item) return null;
  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided) => (
        <StyledItem
          ref={provided.innerRef}
          isOpen={item.isOpen}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <StyledItemHeader onClick={() => handleOpen()} isOpen={item.isOpen}>
            <ItemHeaderTitle isOpen={item.isOpen}>
              {item.isOpen ? `Item ${index + 1}` : item.name}
            </ItemHeaderTitle>
            <StyledDragIndicatorIcon isOpen={item.isOpen}>
              <DragIndicatorIcon fontSize="small" />
            </StyledDragIndicatorIcon>
            <StyledArrowIcon isOpen={item.isOpen}>
              <ArrowIcon />
            </StyledArrowIcon>
          </StyledItemHeader>
          <Collapse in={item.isOpen}>
            <StyledTotymSection>
              <ItemImageSection uploadedFile={item?.image}>
                <StyledButton onClick={() => handleUpload()}>
                  {item?.image ? (
                    <img src={item?.image} alt={item.name} />
                  ) : isMobile ? (
                    <UploadIcon width="45px" height="40px" fill="#fff" />
                  ) : (
                    <UploadIcon width="94px" height="84px" fill="#fff" />
                  )}
                </StyledButton>
              </ItemImageSection>
              <StyledTotymTitle
                placeholder="Item title*"
                name="name"
                id={`${index}-name`}
                value={item.name}
                onChange={handleUpdateItemInfo}
              />
              <StyledTotymDescription
                placeholder="Item Description"
                rows={`${isMobile ? '5' : '1'}`}
                name="description"
                id={`${index}-description`}
                value={item.description}
                onChange={handleUpdateItemInfo}
              />
              <DeleteIconSetion onClick={() => handleDeleteItem('item', item.id)}>
                <DeleteIcon />
              </DeleteIconSetion>
            </StyledTotymSection>
          </Collapse>
        </StyledItem>
      )}
    </Draggable>
  );
}
