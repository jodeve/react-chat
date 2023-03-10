import {
  ListItem,
  Avatar,
  ListItemText,
  Badge,
} from "@material-ui/core";
import useAuth from "hooks/useAuth";
import useChatroom from "./useChatroom";
import CheckIcon from '@material-ui/icons/Check';

const Chatroom = ({ chatroom }) => {

  const {
    currentUser
  } = useAuth();

  let user = chatroom.other_user;

  const {
    onClickChatroom,
  } = useChatroom(user);

  return (
    <>
      <ListItem button onClick={onClickChatroom}>
        <Avatar src={``} />
        <ListItemText style={{ marginLeft: "20px", marginTop: 0 }}
          primary={user.name}
          secondary={`${chatroom.last_message.user_id === currentUser.id ? 'You:' : ''} ${chatroom.last_message.body}`}
        />
        {
          chatroom.unread_messages > 0 ?
            <Badge
              color="primary"
              badgeContent={chatroom.unread_messages}
            >
            </Badge>
            : null
        }
      </ListItem>
    </>
  )
};

export default Chatroom;
