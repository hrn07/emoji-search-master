import { render,fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header from './Header';
import EmojiResults from './EmojiResults';
import emojiData from './emojilist.json';
import filterEmoji from './filterEmoji';
import EmojiResultRow from './EmojiResultRow';

describe("Emoji Testleri", () => {
    let headerTitle;

    // beforeEach(()=>{
    //     render(<Header />);


    // });

    //     beforeAll(()=>{
    //         console.log("İlk başta bir kere çalışacağım")
    //         render(<EmojiResults />);

    //         const emojiList = screen.get('emoji-list');
    //   expect(emojiList).toBeInTheDocument();
    //     })

    beforeAll(() => {
        render(<EmojiResults emojiData={emojiData} />);

        const emojiResults = screen.getByTestId('emoji-results');
        expect(emojiResults).toBeInTheDocument();

        const emojiItems = screen.getAllByTestId('emoji-result-row');
        expect(emojiItems.length).toBeGreaterThan(0);
    });

    test('header title should be', () => {
        render(<Header />);
        headerTitle = screen.getByText(/Emoji Search/i);
        expect(headerTitle).toBeInTheDocument();
    })

    test('Emoji list is filtered and rendered successfully', () => {
        const searchText = 'happy';
        const maxResults = 10;
        const filteredEmojiList = filterEmoji(searchText, maxResults);
      
        render(<EmojiResults emojiData={filteredEmojiList} />);
      
        const emojiResults = screen.getByTestId('emoji-results');
        expect(emojiResults).toBeInTheDocument();
      
        const emojiItems = screen.getAllByTestId('emoji-result-row');
        expect(emojiItems.length).toBe(filteredEmojiList.length);
      });

      test('Emoji is copied when clicked', () => {
        const symbol = '😄';
        const title = 'Smiling Face with Open Mouth';
        const clipboardText = symbol;
      
        render(<EmojiResultRow symbol={symbol} title={title} />);
      
        const emojiRow = screen.getByTestId('emoji-result-row');
        fireEvent.click(emojiRow);
      
        expect(emojiRow).toHaveAttribute('data-clipboard-text', clipboardText);
      });

})