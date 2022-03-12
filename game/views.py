from django.shortcuts import render


def game(request):
    """Displays game board"""
    return render(request, 'game/game.html')
