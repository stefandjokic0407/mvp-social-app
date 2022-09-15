import styled, { useTheme } from 'styled-components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import UploadIcon from '../svgs/UploadIcon';

const StyledTotymSection = styled.div`
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  padding: 0.625rem 1rem;

  ${({ theme }) => theme.breakpoints.up('md')} {
    background: ${({ theme }) => `${theme.colors.background.gray001}`};
    box-sizing: border-box;
    border-radius: 0.25rem;
    padding: 2rem 4.375rem;
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

const StyledTotymDescription = styled.textarea`
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
`;

const StyledSpan = styled.span`
  color: ${({ theme }) => `${theme.colors.white}`};
  font-size: 1.25rem;
  margin-left: 1.625rem;
  white-space: nowrap;
`;

export default function TotymItem({
  onClickUpload,
  uploadedFile,
  itemName,
  handleItemName,
  itemDescription,
  handleItemDescription,
}) {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

  return (
    <StyledTotymSection>
      <ItemImageSection uploadedFile={uploadedFile}>
        <StyledButton onClick={onClickUpload}>
          {uploadedFile ? (
            <img src={uploadedFile.secure_url} alt={uploadedFile.id} />
          ) : isMobile ? (
            <UploadIcon width="45px" height="40px" fill="#fff" />
          ) : (
            <UploadIcon width="94px" height="84px" fill="#fff" />
          )}
        </StyledButton>
      </ItemImageSection>
      <StyledTotymTitle
        placeholder="Item title*"
        value={itemName}
        onChange={handleItemName}
      />
      <StyledTotymDescription
        placeholder="Item Description"
        rows={`${isMobile ? '5' : '1'}`}
        value={itemDescription}
        onChange={handleItemDescription}
      />
    </StyledTotymSection>
  );
}
