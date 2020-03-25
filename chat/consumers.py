import json
import random

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    room_group_name = None

    def connect(self):
        # self.room_group_name = self.scope['url_route']['kwargs']['token_sessao']
        self.room_group_name = self.scope['cookies']["user_id"]
        self.scope["session"]["user_id"] = self.scope['cookies']["user_id"]
        self.scope["session"].save()

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):
        content = json.loads(text_data)

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'broadcast',
                **content
            }
        )

    def broadcast(self, event):
        self.send(text_data=json.dumps(event))
