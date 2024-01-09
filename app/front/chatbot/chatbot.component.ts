import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ChatbotService } from './chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit  {

  prompt = '';
  chatResponse = '';
  userMessages: string[] = []; // Store user messages
  botMessages: string[] = []; // Store chatbot responses
  messages: ChatMessage[] = [];
  
  constructor(private chatBotService: ChatbotService, private renderer: Renderer2) {}

  // ngOnInit() {
  //   // Initialization logic
  // }

  ngOnInit() {
    this.loadJQuery(() => {
      this.loadFloatingChatScript();
    });
  }

  private loadJQuery(callback: () => void) {
    const jqueryScript = this.renderer.createElement('script');
    jqueryScript.type = 'text/javascript';
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.4.min.js'; // Adjust the path or use a CDN

    jqueryScript.onload = () => {
      // jQuery has loaded
      callback();
    };

    this.renderer.appendChild(document.body, jqueryScript);
  }

  private loadFloatingChatScript() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'assets/js/floating-chat.js'; // Adjust the path based on your project structure

    this.renderer.appendChild(document.body, script);
  }

  getChatResponse() {
    this.chatBotService.chat(this.prompt).subscribe(
      (response: string) => {
        this.chatResponse = response;
        this.botMessages.push(response); // Add chatbot response to messages
        this.messages.push({
          text: response,
          timestamp: new Date().getTime(),
          sender: 'other'
        });
      },
      (error) => {
        console.error('Error getting ChatBot response:', error);
      }
    );
  }

  sendNewMessage() {
    this.messages.push({
      text: this.prompt,
      timestamp: new Date().getTime(),
      sender: 'self'
    }); // Add user input to messages
    this.getChatResponse();
    this.messages.sort((a, b) => a.timestamp - b.timestamp);
    this.prompt = ''; // Clear user input after sending
  }
}

interface ChatMessage {
  text: string;
  timestamp: number; // Assuming you have a timestamp for each message
  sender: 'self' | 'other';
}

