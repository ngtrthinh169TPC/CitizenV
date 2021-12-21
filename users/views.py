from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer


class UserAPI(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.create_user(username=request.data.get(
            'username'), password=request.data.get('password'))
        token = Token.objects.create(user=user)
        return Response(status=201, data={'token': token.key, 'user_id': user.pk, 'username': user.username})


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response(status=200, data={
            'token': token.key,
            'user_id': user.pk,
            'username': user.username
        })


class WhoAmI(APIView):
    def get(self, request):
        user_id = Token.objects.get(key=request.auth.key).user_id
        return Response(status=200, data=user_id)
