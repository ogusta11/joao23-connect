
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageSquare, UserPlus } from "lucide-react";

const Notifications = () => {
  const [notifications] = useState({
    likes: [
      {
        id: 1,
        user: "maria.silva",
        action: "curtiu seu post",
        time: "2h atrás",
      },
      {
        id: 2,
        user: "joao.santos",
        action: "curtiu seu comentário",
        time: "5h atrás",
      },
    ],
    comments: [
      {
        id: 1,
        user: "ogusta",
        action: "comentou: 'Muito bem observado!'",
        time: "1h atrás",
      },
    ],
    follows: [
      {
        id: 1,
        user: "pedro.alves",
        action: "começou a seguir você",
        time: "3h atrás",
      },
    ],
  });

  return (
    <div className="animate-fadeIn">
      <Tabs defaultValue="likes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="likes" className="flex items-center space-x-2">
            <Heart className="w-4 h-4" />
            <span>Curtidas</span>
          </TabsTrigger>
          <TabsTrigger value="comments" className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Comentários</span>
          </TabsTrigger>
          <TabsTrigger value="follows" className="flex items-center space-x-2">
            <UserPlus className="w-4 h-4" />
            <span>Seguidores</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="likes" className="space-y-4 mt-4">
          {notifications.likes.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} icon={<Heart className="w-4 h-4 text-primary" />} />
          ))}
        </TabsContent>

        <TabsContent value="comments" className="space-y-4 mt-4">
          {notifications.comments.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} icon={<MessageSquare className="w-4 h-4 text-blue-500" />} />
          ))}
        </TabsContent>

        <TabsContent value="follows" className="space-y-4 mt-4">
          {notifications.follows.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} icon={<UserPlus className="w-4 h-4 text-green-500" />} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const NotificationItem = ({ notification, icon }: any) => (
  <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm animate-slideUp">
    <div>{icon}</div>
    <div className="flex-1">
      <p className="font-medium">{notification.user}</p>
      <p className="text-sm text-gray-600">{notification.action}</p>
    </div>
    <span className="text-xs text-gray-500">{notification.time}</span>
  </div>
);

export default Notifications;
