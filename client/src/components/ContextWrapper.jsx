import React from 'react';
import TeachersFiltersProvider from '../contexts/TeachersFilters';
import LectureSelectionsProvider from '../contexts/LectureSelections';
import HourFiltersProvider from '../contexts/HourFilters';
import BlockedNRCProvider from '../contexts/BlockedNRC';
import BlockedNRCProfProvider from '../contexts/BlockedNRCProf';
import ErrorsProvider from '../contexts/Errors';
export default function ContextWrapper({ children }) {
  return (
    <div>
      <ErrorsProvider>
        <HourFiltersProvider>
          <BlockedNRCProvider>
            <BlockedNRCProfProvider>
              <TeachersFiltersProvider>
                <LectureSelectionsProvider>
                  {children}
                </LectureSelectionsProvider>
              </TeachersFiltersProvider>
            </BlockedNRCProfProvider>
          </BlockedNRCProvider>
        </HourFiltersProvider>
      </ErrorsProvider>
    </div>
  );
}
