import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto: string = '';
  mensajesSubscription: Subscription = new Subscription;
  elemento: HTMLElement;

  mensajes: any[] = [];

  constructor(
    private chatService: ChatService
  ) { }



  ngOnInit(): void {

    this.elemento = document.getElementById("chat-mensajes")!

    this.mensajesSubscription = this.chatService.getMessages().subscribe(msg => {
      
      console.log(msg)
      
      this.mensajes.push(msg)

      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight
      }, 50);

    })

  }

  ngOnDestroy(): void {
    this.mensajesSubscription.unsubscribe();
  }

  enviar() {
    
    if (this.texto.trim().length === 0) return

    console.log(this.texto);
    this.chatService.sendMessage(this.texto)
    this.texto = '';
  }

}
