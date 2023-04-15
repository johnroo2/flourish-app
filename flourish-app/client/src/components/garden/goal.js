export default class Goal{
    static count = 0;

    constructor(title="", user="", current=0, bound=null, streak=null){
        this.title= title;
        this.user = user;
        this.current = Number(current);
        this.limit = Number(bound ? bound : current);
        this.streak = streak;

        this.id = Goal.count++;
    }
}