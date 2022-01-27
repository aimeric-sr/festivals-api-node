"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.performingEventService = void 0;
const performing_event_1 = require("../repositories/performing-event");
class PerformingEventService {
    addPerformingEvent(artist_id, event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return performing_event_1.performingEventRepository.addPerformingEvent(artist_id, event_id);
        });
    }
    delPerformingEvent(artist_id, event_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return performing_event_1.performingEventRepository.delPerformingEvent(artist_id, event_id);
        });
    }
}
exports.performingEventService = new PerformingEventService();
