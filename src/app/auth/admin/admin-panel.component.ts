import {Component, OnInit, ViewChild} from '@angular/core';
import {LessonService} from "../../lesson.service";
import {Lesson} from "../../lesson/lesson.model";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  listGrammar: Array<Lesson> = [];
  listVocabulary: Array<Lesson> = [];
  addMode: boolean = false;

  @ViewChild('button_add') button_add;

  constructor(private lessonService: LessonService) { }

  ngOnInit() {
    this.listGrammar = this.lessonService.getLessonList('gramatika');
    this.listVocabulary = this.lessonService.getLessonList('vokabular');
  }

  onDelete(){
    console.log('rokanjeee');
  }
  onEdit(){

  }

  onAdd(){
    if(!this.addMode) {
      this.addMode = true;
      this.button_add.nativeElement.innerHTML = "Poništi"
    }else{
      this.addMode = false;
      this.button_add.nativeElement.innerHTML = "Dodaj lekciju"
    }

    /*
    od tud obrisat ova svakakva nepotrebna sranja
    implementat ondelete gumbice za question i answer da ne bi bilo da neko sjebe
    dodat edit mode, da kad kliknes te ne redirecta na taj lesson nego ti loada formu s tim vrijednostima (ako bu islo)
    post requestovi idu gore, tak da jebiga, moras sa forom najt property pa onda picit dalje
    dodat select za tip questiona
    trim lowercase na tocan odgovor i ime lekcije
    malo uredit da izgleda kak bog zapoveda
    i slozit da se doda u lesson list, u serviceu dodat neku metodu koja prima lesson, tak je brijem ez
    auth guard za taj admin panel i gg, mislim da nemas vise nis, heheh
    */
  }

}
