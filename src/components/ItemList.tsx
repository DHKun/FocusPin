import { useState } from 'react';
import ModernCheckbox from './ModernCheckbox';
import TimestampDisplay from './TimestampDisplay';
import { PencilIcon, PlusIcon, XIcon } from './icons';
import { usePersistentState, type Item, type ItemKey } from '../store';

// 条目列表:Ideas 和 To-Do 共用的模块。
// 接口只是一份类型配置;CRUD、编辑状态机、持久化都在实现里。
interface ItemListProps {
  storeKey: ItemKey;
  placeholder: string;
  emptyMessage: string;
  /** 有完成态:复选框、待办统计、清除已完成 */
  completable?: boolean;
  /** 无完成态时统计行使用的名词,如 "inspiration" */
  countNoun?: string;
  /** 编辑时用多行文本框 */
  multilineEdit?: boolean;
}

function ItemList({
  storeKey,
  placeholder,
  emptyMessage,
  completable = false,
  countNoun = 'item',
  multilineEdit = false,
}: ItemListProps) {
  const [items, setItems, ready] = usePersistentState(storeKey, []);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const addItem = () => {
    const text = inputValue.trim();
    if (text === '') return;
    const item: Item = {
      id: Date.now().toString(),
      text,
      createdAt: new Date().toISOString(),
      ...(completable ? { completed: false } : {}),
    };
    setItems([item, ...items]);
    setInputValue('');
  };

  const toggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const startEditing = (item: Item) => {
    setEditingId(item.id);
    setEditValue(item.text);
  };

  const saveEdit = (id: string) => {
    const text = editValue.trim();
    if (text) {
      setItems(items.map((item) => (item.id === id ? { ...item, text } : item)));
    }
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const clearCompleted = () => {
    setItems(items.filter((item) => !item.completed));
  };

  const completedCount = items.filter((item) => item.completed).length;
  const pendingCount = items.length - completedCount;

  return (
    <div className="item-list-container">
      <div className="input-row">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addItem();
          }}
          placeholder={placeholder}
          className="modern-input"
        />
        <button onClick={addItem} className="add-button" aria-label="Add" title="Add">
          <PlusIcon />
        </button>
      </div>

      {items.length > 0 && (
        <div className="item-stats">
          {completable ? (
            <>
              <span>
                {pendingCount} pending, {completedCount} completed
              </span>
              {completedCount > 0 && (
                <button onClick={clearCompleted} className="clear-button">
                  Clear Completed
                </button>
              )}
            </>
          ) : (
            <span>
              {items.length} {countNoun}
              {items.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}

      <div className="item-list">
        {!ready ? null : items.length === 0 ? (
          <div className="empty-message">{emptyMessage}</div>
        ) : (
          items.map((item) =>
            editingId === item.id ? (
              <div key={item.id} className="item fade-in">
                <div className="edit-mode">
                  {multilineEdit ? (
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="edit-field edit-textarea"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          saveEdit(item.id);
                        } else if (e.key === 'Escape') {
                          cancelEdit();
                        }
                      }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="edit-field"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          saveEdit(item.id);
                        } else if (e.key === 'Escape') {
                          cancelEdit();
                        }
                      }}
                    />
                  )}
                  <div className="edit-actions">
                    <button onClick={() => saveEdit(item.id)} className="save-button">
                      Save
                    </button>
                    <button onClick={cancelEdit} className="cancel-button">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div key={item.id} className="item fade-in">
                <div className="item-row">
                  {completable ? (
                    <ModernCheckbox
                      checked={item.completed === true}
                      onChange={() => toggleItem(item.id)}
                      label={item.text}
                    />
                  ) : (
                    <div className="item-text">{item.text}</div>
                  )}
                  <div className="item-actions">
                    <button
                      onClick={() => startEditing(item)}
                      className="action-button"
                      title="Edit"
                      aria-label="Edit"
                    >
                      <PencilIcon />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="action-button delete-button"
                      title="Delete"
                      aria-label="Delete"
                    >
                      <XIcon />
                    </button>
                  </div>
                </div>
                <div className={completable ? 'item-meta item-meta-indent' : 'item-meta item-meta-right'}>
                  <TimestampDisplay timestamp={item.createdAt} />
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default ItemList;
