import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

const DEFAULT_AVATAR =
  'https://res.cloudinary.com/di9t1lu8j/image/upload/v1613784258/logos/avatar-default_jvjxyn.png';

const UserCardDiv = styled.div`
	display: flex;
  align-items: center;
	justify-content: center;
  // width: ${({ width }) => width};
  // height: ${({ height }) => height};
  margin-bottom: 15px;
	cursor: pointer;
`;

const AvatarDiv = styled.div`
	width: ${({ width }) => width};
	height: ${({ height }) => height};
	cursor: pointer;
`;
const UserInfoContent = styled.div`
	flex-grow: 1; 
	margin-left: 10px;
	cursor: pointer;
`;
const UserNameDiv = styled.div``;
const NameLabel = styled.label`
	font-size: 16px;
	cursor: pointer;
`;
const UserNameLabel = styled.label`
	font-size: 16px;
	color: #BABABA;
	cursor: pointer;
`;

export default function UserCard({ user, width = '45px', height = '45px', onClick = () => { } }) {
	return (
		<UserCardDiv onClick={onClick}>
			<AvatarDiv>
				<Avatar src={user.image || DEFAULT_AVATAR} style={{width: width, height: height}}/>
			</AvatarDiv>
			<UserInfoContent>
				<UserNameDiv><NameLabel>{user.name}</NameLabel></UserNameDiv>
				<UserNameDiv><UserNameLabel>@{user.username}</UserNameLabel></UserNameDiv>
			</UserInfoContent>
		</UserCardDiv>
	)
}